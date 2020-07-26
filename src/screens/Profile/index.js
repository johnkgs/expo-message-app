import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  AsyncStorage,
} from "react-native";
import { ProgressBar } from "react-native-paper";

import firebase from "firebase";
import "firebase/storage";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import Loading from "../../components/Loading";
import UserImage from "../../components/UserImage";
import { useStateValue } from "../../state/ContextProvider";
import styles from "./styles";

const Profile = ({ navigation }) => {
  const [state, dispatch] = useStateValue();

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const userUid = firebase.auth().currentUser.uid;
  const userData = firebase.database().ref("users");

  const imageStorage = firebase.storage().ref();
  const loadingImageRef = useRef(false);

  useEffect(() => {
    loadingImageRef.current = true;
    loadUserData();
    getPhotoPermissions();

    return () => {
      loadingImageRef.current = false;
    };
  }, []);

  const getPhotoPermissions = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        Alert.alert("", "Nós precisamos do acesso á sua galeria de fotos.");
      }
    }
  };

  const loadUserData = async () => {
    await userData
      .child(userUid)
      .once("value")
      .then((snapshot) => {
        setName(snapshot.val().name);
        setSurname(snapshot.val().surname);
        setUserImage(snapshot.val().userImage);
      });
  };

  useEffect(() => {
    const getInitialState = async () => {
      const darkThemeKey = await AsyncStorage.getItem("DarkThemeKey");

      if (darkThemeKey === "true") {
        setDarkTheme(true);
      }
    };

    getInitialState();
  }, []);

  const switchTheme = () => {
    dispatch({
      type: !darkTheme ? "enableDarkTheme" : "disableDarkTheme",
    });
    setDarkTheme(!darkTheme);
  };

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new Error("utiToBlob falhou"));
      };

      xhr.responseType = "blob";

      xhr.open("GET", uri);

      xhr.send();
    });
  };

  const uploadToFirebase = (blob) => {
    var storageRef = imageStorage.child(`imageData/${userUid}.jpg`).put(blob, {
      contentType: "image/jpeg",
    });

    storageRef.on(
      "state_changed",
      (snapshot) => {
        if (loadingImageRef.current) {
          setShowProgressBar(true);
          var progress = snapshot.bytesTransferred / snapshot.totalBytes;

          if (snapshot.state === "running") {
            setProgress(progress);
          }
        } else {
          storageRef.pause();
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;

          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        imageStorage
          .child(`imageData/${userUid}.jpg`)
          .getDownloadURL()
          .then((url) => {
            if (loadingImageRef.current) {
              setUserImage(url);
              setShowProgressBar(false);
              userData.child(userUid).update({
                userImage: url,
              });

              Alert.alert("", "Imagem salva com sucesso!");
            }
          })
          .catch((error) => {
            throw error;
          });
      }
    );
  };

  const handleImagePicker = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })
      .then((result) => {
        if (!result.cancelled) {
          return uriToBlob(result.uri);
        }
      })
      .then((blob) => {
        if (blob) {
          return uploadToFirebase(blob);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <>
      {name && surname ? (
        <View
          style={[
            styles.container,
            { backgroundColor: state.theme.background },
          ]}
        >
          <View style={styles.imageBox}>
            <View style={styles.userImageContainer}>
              {userImage ? (
                <Image
                  resizeMode="cover"
                  source={{ uri: userImage }}
                  style={styles.userImage}
                />
              ) : (
                <UserImage size={116} />
              )}
            </View>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={styles.addImageButton}
            >
              <Ionicons name="ios-camera" size={28} color="#e0e0e0" />
            </TouchableOpacity>
          </View>
          <>
            {showProgressBar && (
              <View style={styles.progressBarContainer}>
                <ProgressBar
                  style={styles.progressBar}
                  progress={progress}
                  color={state.theme.primary}
                />
                <Text
                  style={[
                    styles.progressBarText,
                    { color: state.theme.onBackground },
                  ]}
                >
                  {Math.floor(progress * 100)}%
                </Text>
              </View>
            )}
          </>
          <View style={styles.halfContainer}>
            <View style={styles.sizeHalfContainer}>
              <Text
                style={[
                  styles.textHalfContainer,
                  {
                    color: state.theme.onBackground,
                  },
                ]}
              >
                Nome
              </Text>
            </View>
            <View style={styles.sizeHalfContainer}>
              <Text
                style={[
                  styles.textHalfContainer,
                  {
                    color: state.theme.onBackground,
                  },
                ]}
              >
                Sobrenome
              </Text>
            </View>
          </View>
          <View style={styles.halfContainer}>
            <View style={styles.sizeHalfContainer}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: state.theme.primary,
                    backgroundColor: state.theme.inputBackground,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.input,
                    { color: state.theme.onInputBackground },
                  ]}
                >
                  {name}
                </Text>
              </View>
            </View>
            <View style={styles.sizeHalfContainer}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: state.theme.primary,
                    backgroundColor: state.theme.inputBackground,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.input,
                    { color: state.theme.onInputBackground },
                  ]}
                >
                  {surname}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.darkThemeContainer}>
            <Ionicons
              name="md-contrast"
              size={24}
              color={state.theme.onBackground}
            />
            <Text
              style={[
                styles.darkThemeTextContainer,
                {
                  color: state.theme.onBackground,
                },
              ]}
            >
              Tema escuro
            </Text>
            <Switch
              value={darkTheme}
              onValueChange={switchTheme}
              trackColor={{
                true: state.theme.surface,
                false: state.theme.surface,
              }}
              thumbColor={state.theme.primary}
            />
          </View>

          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity
              style={[
                styles.logoutButton,
                {
                  backgroundColor: state.theme.primary,
                },
              ]}
              onPress={() => navigation.navigate("Logout")}
            >
              <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;

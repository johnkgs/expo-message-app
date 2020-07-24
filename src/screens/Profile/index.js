import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";

import firebase from "firebase";
import "firebase/storage";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import UserImage from "../../components/UserImage";
import styles from "./styles";

const Profile = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);

  const userData = firebase.database().ref("users");
  const userUid = firebase.auth().currentUser.uid;

  const [userImage, setUserImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const imageStorage = firebase.storage().ref();
  const loadingImageRef = useRef(false);

  useEffect(() => {
    loadingImageRef.current = true;
    loadUserData();
    getPhotoPermissions();

    return function cleanup() {
      loadingImageRef.current = false;
    };
  }, []);

  async function getPhotoPermissions() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        Alert.alert("", "Nós precisamos do acesso á sua galeria de fotos.");
      }
    }
  }

  async function loadUserData() {
    await userData
      .child(userUid)
      .once("value")
      .then((snapshot) => {
        setName(snapshot.val().name);
        setSurname(snapshot.val().surname);
        setUserImage(snapshot.val().userImage);
      });
  }

  function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error("utiToBlob falhou"));
      };

      xhr.responseType = "blob";

      xhr.open("GET", uri);

      xhr.send();
    });
  }

  function uploadToFirebase(blob) {
    var storageRef = imageStorage.child(`imageData/${userUid}.jpg`).put(blob, {
      contentType: "image/jpeg",
    });

    storageRef.on(
      "state_changed",
      function (snapshot) {
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
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            break;

          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      function () {
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
          .catch(function (error) {
            throw error;
          });
      }
    );
  }

  async function handleImagePicker() {
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
  }

  return (
    <>
      {name && surname ? (
        <View style={[styles.container, { backgroundColor: "#fcfcfc" }]}>
          <View style={styles.imageBox}>
            <View style={styles.userImageContainer}>
              {userImage ? (
                <Image
                  resizeMode="cover"
                  source={{ uri: userImage }}
                  style={styles.userImage}
                />
              ) : (
                <UserImage size={120} />
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
                  color={"#137b9c"}
                />
                <Text style={[styles.progressBarText, { color: "#000000" }]}>
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
                    color: "#000000",
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
                    color: "#000000",
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
                    borderColor: "#137b9c",
                    backgroundColor: "#ffffff",
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.input, { color: "#000000" }]}
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
                    borderColor: "#137b9c",
                    backgroundColor: "#ffffff",
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.input, { color: "#000000" }]}
                >
                  {surname}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity
              style={[
                styles.logoutButton,
                {
                  backgroundColor: "#137b9c",
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

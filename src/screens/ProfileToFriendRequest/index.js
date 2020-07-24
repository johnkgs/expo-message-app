import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase";

import UserImage from "../../components/UserImage";
import Loading from "../../components/Loading";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

const ProfileToFriendRequest = ({ navigation, route }) => {
  const [friend, setFriend] = useState(false);
  const [loading, setLoading] = useState(false);

  const userUid = firebase.auth().currentUser.uid;
  const user = route.params;

  const friendRequestData = firebase.database().ref("friendRequest");

  const friendsData = firebase
    .database()
    .ref("friends")
    .child(userUid)
    .child("acceptedFriends");

  useEffect(() => {
    let isMounted = true;

    friendsData.on("child_added", (snapshot) => {
      if (isMounted) {
        if (snapshot.val().uid === user.uid) {
          setFriend(true);
        }
      }
    });

    setLoading(true);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `${user.name} ${user.surname}`,
      headerTitleStyle: {
        textTransform: "capitalize",
      },
    });
  }, []);

  const sendFriendRequest = () => {
    const receivedFriendRequest = {
      uid: userUid,
    };

    friendRequestData
      .child(user.uid)
      .child("requests")
      .child(userUid)
      .set(receivedFriendRequest);

    Alert.alert("", "Pedido de amizade enviado com sucesso!");
    navigation.goBack();
  };

  return (
    <>
      {loading ? (
        <View style={[styles.container, { backgroundColor: "#fcfcfc" }]}>
          <>
            {friend ? (
              <View
                style={[
                  styles.alreadyFriendsContainer,
                  { backgroundColor: "#fcfcfc" },
                ]}
              >
                <Text style={{ color: "#000000", fontSize: 20 }}>
                  Você e{" "}
                  <Text style={styles.alreadyFriendsTextContainer}>
                    {user.name} {user.surname}
                  </Text>{" "}
                  já são amigos!
                </Text>
              </View>
            ) : (
              <View style={styles.friendContainer}>
                <View style={styles.userImageContainer}>
                  {user.userImage ? (
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: user.userImage,
                      }}
                      style={styles.userImage}
                    />
                  ) : (
                    <UserImage size={190} />
                  )}
                </View>
                <View style={styles.halfContainer}>
                  <View style={styles.sizeHalfContainer}>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          backgroundColor: "#ffffff",
                          borderColor: "#137b9c",
                        },
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        style={[styles.input, { color: "#000000" }]}
                      >
                        {user.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.sizeHalfContainer}>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          backgroundColor: "#ffffff",
                          borderColor: "#137b9c",
                        },
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        style={[styles.input, { color: "#000000" }]}
                      >
                        {user.surname}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: "#137b9c" }]}
                  onPress={sendFriendRequest}
                >
                  <Text style={styles.addButtonText}>Adicionar</Text>
                  <Ionicons name="ios-person-add" size={30} color="#ffffff" />
                </TouchableOpacity>
              </View>
            )}
          </>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileToFriendRequest;

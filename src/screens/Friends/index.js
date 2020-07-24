import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import firebase from "firebase";

import UserImage from "../../components/UserImage";
import Loading from "../../components/Loading";
import styles from "./styles";

const Friends = ({ navigation }) => {
  const [friendList, setFriendList] = useState("");
  const [loading, setLoading] = useState(true);

  const userUid = firebase.auth().currentUser.uid;
  const userData = firebase.database().ref("users");
  const friendsData = firebase.database().ref("friends");

  useEffect(() => {
    let isMounted = true;

    friendsData
      .child(userUid)
      .child("acceptedFriends")
      .on("value", (snapshot) => {
        setLoading(true);
        setFriendList([]);
        if (snapshot.exists()) {
          snapshot.forEach((snap) => {
            userData.on("child_added", (userSnapshot) => {
              if (isMounted) {
                if (snap.val().uid === userSnapshot.val().uid) {
                  setFriendList((prevState) => {
                    return [...prevState, userSnapshot.val()];
                  });
                }
              }
              setLoading(false);
            });
          });
        } else {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      userData.off();
      friendsData.off();
      setFriendList([]);
    };
  }, []);

  const renderData = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", item)}
      style={[
        styles.userContainer,
        {
          backgroundColor: "#ededed",
          borderBottomColor: "#137b9c",
        },
      ]}
    >
      <View>
        <View style={styles.userImageContainer}>
          {item.userImage ? (
            <Image
              resizeMode="cover"
              source={{
                uri: item.userImage,
              }}
              style={styles.userImage}
            />
          ) : (
            <UserImage size={46} />
          )}
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Text
          numberOfLines={2}
          style={[
            styles.nameTextContainer,
            {
              color: "#000000",
            },
          ]}
        >
          {item.name} {item.surname}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <Loading />
      ) : (
        <Text numberOfLines={2} style={{ fontSize: 16, color: "#000000" }}>
          Não há ninguém em sua lista de amigos
        </Text>
      )}
    </View>
  );

  const renderHeaderComponent = () => (
    <View style={[styles.userListContainer, { borderBottomColor: "#137b9c" }]}>
      <Text style={[styles.userListTextContainer, { color: "#000000" }]}>
        Lista de Amigos
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: "#fcfcfc" }]}>
      <FlatList
        data={friendList}
        renderItem={renderData}
        keyExtractor={(item) => item.uid}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={renderHeaderComponent}
      />
    </View>
  );
};

export default Friends;

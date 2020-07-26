import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

import UserImage from "../../components/UserImage";
import Loading from "../../components/Loading";
import { useStateValue } from "../../state/ContextProvider";
import styles from "./styles";

const FriendRequest = () => {
  const [state] = useStateValue();
  const [friendRequestList, setFriendRequestList] = useState("");
  const [loading, setLoading] = useState(true);

  const userUid = firebase.auth().currentUser.uid;

  const userData = firebase.database().ref("users");
  const friendsData = firebase.database().ref("friends");
  const friendRequestData = firebase
    .database()
    .ref("friendRequest")
    .child(userUid)
    .child("requests");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    friendRequestData.on("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((snap) => {
          userData.on("child_added", (userSnapshot) => {
            if (isMounted) {
              if (snap.val().uid === userSnapshot.val().uid) {
                setFriendRequestList((prevState) => {
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
      friendRequestData.off();
      userData.off();
      setFriendRequestList([]);
    };
  }, []);

  const acceptFriendRequest = (item) => {
    let { uid } = item;

    let acceptFriend = {
      uid,
    };
    let sendAcceptFriend = {
      uid: userUid,
    };

    friendsData
      .child(userUid)
      .child("acceptedFriends")
      .child(uid)
      .set(acceptFriend);

    friendsData
      .child(uid)
      .child("acceptedFriends")
      .child(userUid)
      .set(sendAcceptFriend);

    setFriendRequestList(
      friendRequestList.filter((request) => uid !== request.uid)
    );
    friendRequestData.child(uid).remove();
    friendRequestData.child(userUid).remove();
  };

  const rejectFriendRequest = (item) => {
    setFriendRequestList(
      friendRequestList.filter((request) => item.uid !== request.uid)
    );
    friendRequestData.child(item.uid).remove();
    friendRequestData.child(userUid).remove();
  };

  const renderData = ({ item }) => (
    <View
      style={[
        styles.userContainer,
        {
          backgroundColor: state.theme.surface,
          borderBottomColor: state.theme.primary,
        },
      ]}
    >
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
          <UserImage size={48} />
        )}
      </View>

      <View style={styles.nameContainer}>
        <Text
          numberOfLines={2}
          style={[
            styles.nameTextContainer,
            {
              color: state.theme.onSurface,
            },
          ]}
        >
          {item.name} {item.surname}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => acceptFriendRequest(item)}
          style={styles.acceptButton}
        >
          <Ionicons name="ios-checkmark" color="#ffffff" size={36} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => rejectFriendRequest(item)}
          style={styles.rejectButton}
        >
          <Ionicons name="ios-close" color="#ffffff" size={36} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <Loading />
      ) : (
        <Text
          numberOfLines={2}
          style={{ fontSize: 16, color: state.theme.onBackground }}
        >
          Não há novos pedidos de amizade
        </Text>
      )}
    </View>
  );

  const renderHeaderComponent = () => (
    <View
      style={[
        styles.userListContainer,
        { borderBottomColor: state.theme.primary },
      ]}
    >
      <Text
        style={[
          styles.userListTextContainer,
          { color: state.theme.onBackground },
        ]}
      >
        Pedidos de Amizade
      </Text>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: state.theme.background }]}
    >
      <FlatList
        data={friendRequestList}
        renderItem={renderData}
        keyExtractor={(item) => item.uid}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={renderHeaderComponent}
      />
    </View>
  );
};

export default FriendRequest;

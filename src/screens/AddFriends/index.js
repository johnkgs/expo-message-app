import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import firebase from "firebase";
import CustomInput from "../../components/CustomInput";
import UserImage from "../../components/UserImage";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const AddFriends = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const userData = firebase.database().ref("users");
  const userUid = firebase.auth().currentUser.uid;

  useEffect(() => {
    let isMounted = true;
    userData.on("child_added", (snapshot) => {
      if (isMounted) {
        if (snapshot.val().uid !== userUid) {
          setUsers((prevState) => {
            return [...prevState, snapshot.val()];
          });
        }
      }
    });

    return () => {
      isMounted = false;
      setUsers([]);
    };
  }, []);

  const filteredData = users.filter((item) => {
    return item.name.indexOf(searchText) >= 0;
  });

  const renderData = ({ item }) => (
    <>
      {!!searchText && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileToFriendRequest", item);
            setSearchText("");
          }}
          style={[
            styles.userContainer,
            {
              backgroundColor: "#ededed",
              borderBottomColor: "#137b9c",
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
              <UserImage size={46} />
            )}
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
      )}
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: "#fcfcfc" }]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: "#137b9c",
            backgroundColor: "#ffffff",
          },
        ]}
      >
        <CustomInput
          returnKeyType="search"
          placeholder="Buscar amigo..."
          onChangeText={(text) => setSearchText(text)}
          style={[
            styles.input,
            {
              color: "#282828",
            },
          ]}
          value={searchText}
        />
        <Ionicons
          name="ios-search"
          style={{ padding: 10 }}
          size={24}
          color="#000000"
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderData}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
};

export default AddFriends;

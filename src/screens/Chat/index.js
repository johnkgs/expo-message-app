import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, FlatList, Keyboard, Image } from "react-native";
import firebase from "firebase";

import UserImage from "../../components/UserImage";
import { useStateValue } from "../../state/ContextProvider";
import styles from "./styles";

const Chat = ({ navigation, route }) => {
  const [state] = useStateValue();
  const [textMessage, setTextMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [inputHeight, setInputHeight] = useState(48);
  const [keyboardIsShow, setKeyboardIsShow] = useState(false);

  const user = route.params;
  const userUid = firebase.auth().currentUser.uid;

  const messageData = firebase.database().ref("messages");
  const flatListRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      title: `${user.name} ${user.surname}`,
      headerTitle: () => (
        <View style={styles.headerTitle}>
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
              <UserImage size={34} />
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, { color: state.theme.onBackground }]}
              numberOfLines={1}
            >
              {user.name} {user.surname}
            </Text>
          </View>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    messageData
      .child(userUid)
      .child(user.uid)
      .on("child_added", (value) => {
        if (isMounted) {
          setMessageList((prevState) => {
            return [...prevState, value.val()];
          });
        }
      });

    return () => {
      isMounted = false;
      messageData.off();
      setMessageList([]);
    };
  }, []);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardIsShow(true)
    );

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardIsShow(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    if (c.getDate() !== d.getDate()) {
      result = d.getDay() + " " + d.getMonth() + " " + result;
    }
    return result;
  };

  const sendMessage = async () => {
    if (textMessage.trim().length > 0) {
      let msgId = messageData.child(userUid).child(user.uid).push().key;
      let updates = {};
      let message = {
        message: textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: userUid,
      };
      updates[user.uid + "/" + userUid + "/" + msgId] = message;
      updates[userUid + "/" + user.uid + "/" + msgId] = message;
      messageData.update(updates);
      setTextMessage("");
      setInputHeight(48);
    }
  };

  const renderData = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: item.from === userUid ? "flex-end" : "flex-start",
          backgroundColor:
            item.from === userUid
              ? state.theme.sendMessage
              : state.theme.receiveMessage,
        },
      ]}
    >
      <View style={{ flexDirection: "column", maxWidth: "100%" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#ffffff", padding: 7, fontSize: 16 }}>
            {item.message}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <Text
            style={{
              color: "#ffffff",
              padding: 3,
              paddingLeft: 30,
              marginTop: -10,
              fontSize: 12,
            }}
          >
            {convertTime(item.time)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: state.theme.background }]}
    >
      <View
        style={[
          styles.sendMessageContainer,
          {
            backgroundColor: state.theme.background,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              height: inputHeight > 48 ? inputHeight : 48,
              backgroundColor: state.theme.inputBackground,
              color: state.theme.onInputBackground,
              borderColor: state.theme.primary,
            },
          ]}
          value={textMessage}
          placeholder="Digite uma mensagem..."
          onChangeText={(text) => setTextMessage(text)}
          placeholderTextColor={state.theme.dark ? "#9e9e9e" : "#595959"}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline
          blurOnSubmit
          onContentSizeChange={(e) => {
            const inputChatHeight = Math.floor(
              e.nativeEvent.contentSize.height
            );
            inputChatHeight > 100
              ? setInputHeight(100)
              : setInputHeight(inputChatHeight);
          }}
        />
      </View>

      <FlatList
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current.scrollToEnd(true)}
        onLayout={() => flatListRef.current.scrollToEnd(true)}
        style={styles.flatListContainer}
        data={messageList}
        renderItem={renderData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        ListFooterComponent={
          <View
            style={{
              height: keyboardIsShow
                ? inputHeight > 48
                  ? inputHeight + 20
                  : 70
                : inputHeight > 48
                ? inputHeight + 20
                : 70,
            }}
          />
        }
      />
    </View>
  );
};

export default Chat;

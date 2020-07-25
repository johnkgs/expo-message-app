import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import firebase from "firebase";
import Loading from "../../components/Loading";

const Logout = () => {
  const userData = firebase.database().ref("users");

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    async function logout() {
      await userData.child(firebase.auth().currentUser.uid).update({
        status: "offline",
      });

      await firebase.auth().signOut();
    }

    setTimeout(() => {
      logout();
    }, 1500);

    return () => backHandler.remove();
  }, []);

  return <Loading />;
};

export default Logout;

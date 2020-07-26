import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import firebase from "firebase";
import Loading from "../../components/Loading";
import { useStateValue } from "../../state/ContextProvider";

const Logout = () => {
  const [, dispatch] = useStateValue();
  const userData = firebase.database().ref("users");

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    const logout = async () => {
      await dispatch({
        type: "disableDarkTheme",
      });
      await userData.child(firebase.auth().currentUser.uid).update({
        status: "offline",
      });

      await firebase.auth().signOut();
    };

    setTimeout(() => {
      logout();
    }, 1500);

    return () => backHandler.remove();
  }, []);

  return <Loading />;
};

export default Logout;

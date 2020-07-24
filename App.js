import React from "react";
import { StatusBar } from "expo-status-bar";
import AuthNavigator from "./src/navigation";
import firebase from "firebase";
import { firebaseConfig } from "./src/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AuthNavigator />
    </>
  );
};

export default App;

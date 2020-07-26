import React from "react";
import firebase from "firebase";
import { firebaseConfig } from "./src/firebaseConfig";
import { AsyncStorage } from "react-native";
import CustomProvider from "./src/state/CustomProvider";
import { StateProvider } from "./src/state/ContextProvider";

import lightTheme from "./src/themes/light";
import darkTheme from "./src/themes/dark";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const initialState = { theme: lightTheme };

  const updateStorage = async (state) => {
    await AsyncStorage.setItem("DarkThemeKey", String(state));
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "enableDarkTheme":
        updateStorage(true);
        return {
          ...state,
          theme: darkTheme,
        };
      case "disableDarkTheme":
        updateStorage(false);
        return {
          ...state,
          theme: lightTheme,
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <CustomProvider />
    </StateProvider>
  );
};

export default App;

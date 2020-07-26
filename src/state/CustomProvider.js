import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { useStateValue } from "./ContextProvider";
import AuthNavigator from "../navigation";

const CustomProvider = () => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    let isMounted = true;
    const getStorageDarkTheme = async () => {
      const darkThemeKey = await AsyncStorage.getItem("DarkThemeKey");
      if (isMounted) {
        if (darkThemeKey === "true") {
          dispatch({
            type: "enableDarkTheme",
          });
          return;
        }
        dispatch({
          type: "disableDarkTheme",
        });
      }
    };

    getStorageDarkTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={state.theme}>
      <StatusBar style={state.theme.dark ? "light" : "dark"} />
      <AuthNavigator />
    </ThemeProvider>
  );
};

export default CustomProvider;

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";

import AppScreen from "./AppStack";
import AuthStack from "./AuthStack";
import Loading from "../components/Loading";

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={AppScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const AuthNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorageData() {
      firebase.auth().onAuthStateChanged(async (userFirebase) => {
        await new Promise((resolve) => setTimeout(resolve, 1750));
        userFirebase ? setUser(userFirebase) : setUser(null);
        setLoading(false);
      });
    }
    loadStorageData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <RootStackScreen userToken={user} />
    </NavigationContainer>
  );
};

export default AuthNavigator;

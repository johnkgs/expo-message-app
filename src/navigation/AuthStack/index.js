import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{
          title: "Cadastro",
        }}
        component={Signup}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

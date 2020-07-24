import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import RequestFriend from "../../screens/RequestFriend";
import Friends from "../../screens/Friends";

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#137B9C" }}>
      <Tab.Screen
        name="Amigos"
        component={Friends}
        options={{
          tabBarLabel: "Amigos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Pendente"
        component={RequestFriend}
        options={{
          tabBarLabel: "Pendente",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default AppStack;

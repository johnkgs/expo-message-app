import React, { useRef } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image, TouchableOpacity, Text, View } from "react-native";
import Menu from "react-native-material-menu";
import { TouchableRipple } from "react-native-paper";

import { Ionicons, Entypo } from "@expo/vector-icons";

import Profile from "../../screens/Profile";
import AddFriends from "../../screens/AddFriends";
import ProfileToFriendRequest from "../../screens/ProfileToFriendRequest";
import FriendRequest from "../../screens/FriendRequest";
import Friends from "../../screens/Friends";
import Logout from "../../screens/Logout";
import Chat from "../../screens/Chat";

import logo from "../../assets/logo.png";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
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
        component={FriendRequest}
        options={{
          tabBarLabel: "Pendente",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = ({ navigation }) => {
  const menuRef = useRef(null);
  const openMenu = () => menuRef.current.show();
  const closeMenu = () => menuRef.current.hide();

  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerTintColor: "#000000",
          headerStyle: {
            backgroundColor: "#fcfcfc",
          },
          headerLeft: () => <Image source={logo} style={{ marginLeft: 16 }} />,
          title: "MessageApp",
          headerRight: () => (
            <Menu
              ref={menuRef}
              style={{
                backgroundColor: "#fcfcfc",
              }}
              button={
                <TouchableOpacity onPress={openMenu}>
                  <Entypo
                    name="dots-three-vertical"
                    size={24}
                    color="#000000"
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
              }
            >
              <TouchableRipple
                style={{ padding: 14, minWidth: 124, maxWidth: 248 }}
                onPress={() => {
                  navigation.navigate("Profile");
                  closeMenu();
                }}
                rippleColor="#d4d4d4"
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="ios-person" color="#000000" size={20} />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#000000",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Perfil
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                style={{
                  padding: 14,
                  minWidth: 124,
                  maxWidth: 248,
                }}
                onPress={() => {
                  navigation.navigate("AddFriends");
                  closeMenu();
                }}
                rippleColor="#d4d4d4"
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="ios-people" color="#000000" size={20} />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#000000",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Adicionar Amigos
                  </Text>
                </View>
              </TouchableRipple>
            </Menu>
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Perfil",
        }}
      />
      <Stack.Screen
        name="AddFriends"
        component={AddFriends}
        options={{
          title: "Adicionar Amigos",
        }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileToFriendRequest"
        component={ProfileToFriendRequest}
      />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default AppStack;

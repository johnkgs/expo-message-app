import React, { useRef } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import Menu from 'react-native-material-menu';
import { TouchableRipple } from 'react-native-paper';
import { Ionicons, Entypo } from '@expo/vector-icons';

import Profile from '../../screens/Profile';
import AddFriends from '../../screens/AddFriends';
import ProfileToFriendRequest from '../../screens/ProfileToFriendRequest';
import FriendRequest from '../../screens/FriendRequest';
import Friends from '../../screens/Friends';
import Logout from '../../screens/Logout';
import Chat from '../../screens/Chat';

import { useStateValue } from '../../state/ContextProvider';
import logo from '../../assets/logo.png';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const { state } = useStateValue();

  return (
    <Tab.Navigator barStyle={{ backgroundColor: state.theme.primary }}>
      <Tab.Screen
        name="Amigos"
        component={Friends}
        options={{
          tabBarLabel: 'Amigos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Pendente"
        component={FriendRequest}
        options={{
          tabBarLabel: 'Pendente',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const { state } = useStateValue();
  const navigation = useNavigation();
  const menuRef = useRef() as React.MutableRefObject<Menu>;

  const openMenu = () => menuRef.current.show();
  const closeMenu = () => menuRef.current.hide();

  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerLeft: () => <Image source={logo} style={{ marginLeft: 16 }} />,
          title: 'MessageApp',
          headerRight: () => (
            <Menu
              ref={menuRef}
              style={{
                backgroundColor: state.theme.background
              }}
              button={
                <TouchableOpacity onPress={openMenu}>
                  <Entypo
                    name="dots-three-vertical"
                    size={24}
                    color={state.theme.onBackground}
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
              }
            >
              <TouchableRipple
                style={{ padding: 14, minWidth: 124, maxWidth: 248 }}
                onPress={() => {
                  navigation.navigate('Profile');
                  closeMenu();
                }}
                rippleColor={state.theme.rippleColor}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons
                    name="ios-person"
                    color={state.theme.onBackground}
                    size={20}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: state.theme.onBackground,
                      fontSize: 16,
                      marginLeft: 10
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
                  maxWidth: 248
                }}
                onPress={() => {
                  navigation.navigate('AddFriends');
                  closeMenu();
                }}
                rippleColor={state.theme.rippleColor}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons
                    name="ios-people"
                    color={state.theme.onBackground}
                    size={20}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: state.theme.onBackground,
                      fontSize: 16,
                      marginLeft: 10
                    }}
                  >
                    Adicionar Amigos
                  </Text>
                </View>
              </TouchableRipple>
            </Menu>
          )
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil'
        }}
      />
      <Stack.Screen
        name="AddFriends"
        component={AddFriends}
        options={{
          title: 'Adicionar Amigos'
        }}
      />
      <Stack.Screen
        name="ProfileToFriendRequest"
        component={ProfileToFriendRequest}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

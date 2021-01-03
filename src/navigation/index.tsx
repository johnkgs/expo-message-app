import React, { useEffect, useState } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

import AppScreen from './AppStack';
import AuthStack from './AuthStack';
import Loading from '../components/Loading';
import { useStateValue } from '../state/ContextProvider';
import { RootStackScreenProps, UserTokenOptions } from '../common/types';

const RootStack = createStackNavigator();

const RootStackScreen: React.FC<RootStackScreenProps> = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={AppScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

const AuthNavigator = () => {
  const { state } = useStateValue();
  const [user, setUser] = useState<UserTokenOptions>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async userFirebase => {
      await new Promise(resolve => setTimeout(resolve, 1750));
      setUser(userFirebase);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <NavigationContainer theme={state.theme.dark ? DarkTheme : DefaultTheme}>
      <RootStackScreen userToken={user} />
    </NavigationContainer>
  );
};

export default AuthNavigator;

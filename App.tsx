import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

import { firebaseConfig } from './src/config/firebaseConfig';
import CustomProvider from './src/state/CustomProvider';
import { StateProvider } from './src/state/ContextProvider';
import { ThemeActionConfig, ThemeStateConfig } from './src/common/types';
import lightTheme from './src/themes/light';
import darkTheme from './src/themes/dark';

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const App = () => {
  const initialState = { theme: lightTheme };

  const updateStorage = async (state: boolean) => {
    await AsyncStorage.setItem('DarkThemeKey', JSON.stringify(state));
  };

  const reducer = (state: ThemeStateConfig, action: ThemeActionConfig) => {
    switch (action.type) {
      case 'enableDarkTheme':
        updateStorage(true);
        return {
          ...state,
          theme: darkTheme
        };
      case 'disableDarkTheme':
        updateStorage(false);
        return {
          ...state,
          theme: lightTheme
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

import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { useStateValue } from './ContextProvider';
import AuthNavigator from '../navigation';

const CustomProvider = () => {
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    AsyncStorage.getItem('DarkThemeKey')
      .then(response => {
        if (response === 'true') {
          return dispatch({
            type: 'enableDarkTheme'
          });
        }
        return dispatch({
          type: 'disableDarkTheme'
        });
      })
      .catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={state.theme}>
      <StatusBar style={state.theme.dark ? 'light' : 'dark'} />
      <AuthNavigator />
    </ThemeProvider>
  );
};

export default CustomProvider;

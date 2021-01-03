import { FormEvent } from 'react';
import { GestureResponderEvent } from 'react-native';
import firebase from 'firebase';

export type ErrorMessageOptions = string | false | undefined;

export type ThemeActionOptions = 'enableDarkTheme' | 'disableDarkTheme';

export type IconNameOptions = 'ios-eye-off' | 'ios-eye';

export type UserTokenOptions = firebase.User | null;

export type HandleSubmitFormik =
  | ((
      event?: FormEvent<HTMLFormElement> | GestureResponderEvent | undefined
    ) => void)
  | undefined;

export interface UserData {
  uid: string;
  name: string;
  surname: string;
  userImage?: string;
  status: string;
}

export interface ThemeData {
  dark: boolean;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  primary: string;
  inputBackground: string;
  onInputBackground: string;
  rippleColor: string;
  sendMessage: string;
  receiveMessage: string;
}

export interface RootStackScreenProps {
  userToken: UserTokenOptions;
}

export interface ErrorMessageConfig {
  value: ErrorMessageOptions;
}

export interface UserImageConfig {
  size: number;
}

export interface ThemeActionConfig {
  type: ThemeActionOptions;
}

export interface ThemeStateConfig {
  theme: ThemeData;
}

export interface ThemeContextConfig {
  state: ThemeStateConfig;
  dispatch: ({ type }: ThemeActionConfig) => void;
}

export interface MessageListConfig {
  time: number;
  message: string;
  from: string;
  to: string;
}

export interface UpdatedMessageConfig {
  [key: string]: {
    message: string;
    time: Object;
    from: string;
  };
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignupValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ThemeThemeStateConfigProvider {
  reducer: (
    state: ThemeStateConfig,
    action: ThemeActionConfig
  ) => ThemeStateConfig;
  initialState: ThemeStateConfig;
  children: React.ReactNode;
}

import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

const CustomInput: React.FC<TextInputProps> = ({ ...rest }) => (
  <TextInput
    autoCorrect={false}
    autoCapitalize="none"
    placeholderTextColor="#595959"
    style={styles.input}
    {...rest}
  />
);

export default CustomInput;

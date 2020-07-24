import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

const CustomInput = ({ placeholder, onChangeText, value, ...rest }) => (
  <TextInput
    autoCorrect={false}
    autoCapitalize="none"
    placeholderTextColor="#595959"
    placeholder={placeholder}
    style={styles.input}
    onChangeText={onChangeText}
    value={value}
    {...rest}
  />
);

export default CustomInput;

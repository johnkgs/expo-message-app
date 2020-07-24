import React from "react";
import { Text } from "react-native";
import styles from "./styles";

const ErrorMessage = ({ errorValue }) => {
  return <Text style={styles.errorText}>{errorValue}</Text>;
};

export default ErrorMessage;

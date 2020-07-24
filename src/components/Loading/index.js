import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

export default Loading;

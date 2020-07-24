import React from "react";
import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const UserImage = ({ size }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Ionicons name="ios-person" size={size} />
    </View>
  );
};

export default UserImage;

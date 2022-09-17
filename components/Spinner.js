import React from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner = () => (
  <View className="items-center justify-center my-2">
    <ActivityIndicator size="large" color="black" />
  </View>
);

export default Spinner;

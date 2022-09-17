import { View, ImageBackground } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={require("../assets/Images/splash.gif")}
      ></ImageBackground>
    </View>
  );
};

export default SplashScreen;

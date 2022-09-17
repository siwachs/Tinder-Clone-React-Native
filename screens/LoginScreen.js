import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Platform,
  Button,
} from "react-native";
import React from "react";

//ContextAPI.
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle, loading, initialLoading } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1 items-center"
        source={require("../assets/Images/tinder.png")}
      >
        <TouchableOpacity
          disabled={loading === true || initialLoading === true}
          onPress={signInWithGoogle}
          className={`w-52 bg-white p-4 rounded-2xl absolute bottom-8`}
        >
          <Text className="font-semibold text-center">
            Sign In With Google.
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

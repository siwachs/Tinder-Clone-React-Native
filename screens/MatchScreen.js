import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

const MatchScreen = () => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const { loggedInUser, userSwiped } = params;

  return (
    <View className={`h-full bg-red-500 pt-20`} style={[{ opacity: 0.89 }]}>
      <View className="justify-center px-10 pt-20">
        <Image
          className="w-full h-20"
          source={require("../assets/Images/its-a-match.png")}
        ></Image>
      </View>
      <Text className="mt-5 text-white text-center">
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View className="flex-row justify-evenly mt-5">
        <Image
          style={{
            resizeMode: "contain",
          }}
          className="h-32 w-32 rounded-full"
          source={{
            uri: loggedInUser.photoURL,
          }}
        ></Image>

        <Image
          style={{ resizeMode: "contain" }}
          className="h-32 w-32 rounded-full"
          source={{
            uri: userSwiped.photoURL,
          }}
        ></Image>
      </View>

      <TouchableOpacity
        className="bg-white mx-5 rounded-full mt-14 py-6"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chats");
        }}
      >
        <Text className="text-center font-semibold">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;

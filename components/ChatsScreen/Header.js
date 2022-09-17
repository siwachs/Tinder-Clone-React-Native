import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

//Icons...
import { Foundation, Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={navigation.goBack} className="p-2">
          <Ionicons
            name="chevron-back-outline"
            size={40}
            color="#FF5864"
          ></Ionicons>
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className="rounded-full bg-red-200 mr-4 h-10 w-10 justify-center items-center">
          <Foundation name="telephone" size={26} color="red"></Foundation>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

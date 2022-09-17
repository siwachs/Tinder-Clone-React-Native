import { View, TouchableOpacity } from "react-native";
import React from "react";

//Icons...
import { Entypo, AntDesign } from "@expo/vector-icons";

const BottomControls = ({ siwpeRef }) => {
  return (
    <View className="flex-row justify-evenly p-2">
      <TouchableOpacity
        className="items-center justify-center w-16 h-16 bg-red-200 rounded-full"
        onPress={() => siwpeRef.current.swipeLeft()}
      >
        <Entypo color={"red"} name="cross" size={36}></Entypo>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center w-16 h-16 bg-green-200 rounded-full"
        onPress={() => siwpeRef.current.swipeRight()}
      >
        <AntDesign color={"green"} name="heart" size={36}></AntDesign>
      </TouchableOpacity>
    </View>
  );
};

export default BottomControls;

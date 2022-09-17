import { View, Text, Image } from "react-native";
import React from "react";

import { styles } from "../../../globlStyles";

const NoCard = () => {
  return (
    <View
      key={39389}
      className="bg-white h-3/4 rounded-xl justify-center items-center"
      style={styles.cardShadow}
    >
      <Image
        style={{
          resizeMode: "contain",
        }}
        source={require("../../../assets/Images/sad.webp")}
        className="h-56 w-full"
      ></Image>
      <Text className="text-center my-2 font-bold text-lg">
        No More Profile.
      </Text>
    </View>
  );
};

export default NoCard;

import { View, Text, Image } from "react-native";
import React from "react";

import { styles } from "../../../globlStyles";

const Card = ({ card }) => {
  return (
    <View key={card.id} className="bg-white h-3/4 rounded-xl rounded-b-none">
      <Image
        style={{ resizeMode: "contain" }}
        source={{ uri: card.photoURL }}
        className="h-full w-full"
      ></Image>

      <View
        className="bg-white w-full h-20 px-6 flex-row justify-between items-center rounded-b-xl"
        style={styles.cardShadow}
      >
        <View>
          <Text className="text-xl font-bold">{card.displayName}</Text>
          <Text>{card.job}</Text>
        </View>
        <View>
          <Text className="text-xl font-bold">{card.age}</Text>
          <Text>{card.gender}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

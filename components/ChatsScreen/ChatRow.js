import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";

//Utilities...
import { filterUsers } from "../../Utilities/multipurposeUtilities";

import { styles } from "../../globlStyles";

//Firebase FireStore...
import { db } from "../../firebaseWeb";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  const { userInfo } = useAuth();
  const navigation = useNavigation();

  const [filteredUser, setFilteredUser] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc"),
          limit(1)
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data().message)
      ),
    [db, matchDetails]
  );

  useEffect(() => {
    setFilteredUser(filterUsers(matchDetails.users, userInfo.uid));
  }, [userInfo, matchDetails]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Messages", {
          matchDetails,
        })
      }
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.chatRowShadow}
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        style={{ resizeMode: "contain" }}
        source={{ uri: filteredUser?.photoURL }}
      ></Image>

      <View>
        <Text className="text-lg font-semibold">
          {filteredUser?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";

//Firebase FireStore...
import { db } from "../../firebaseWeb";
import { onSnapshot, collection, query, where } from "firebase/firestore";

//Context...
import useAuth from "../../hooks/useAuth";

//Components...
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "Matches"),
        where(`usersMatched`, "array-contains", userInfo.uid)
      ),
      (snapshot) => {
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return unsub;
  }, [userInfo, db]);

  return (
    matches.length > 0 && (
      <FlatList
        style={{ height: "100%" }}
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatRow matchDetails={item}></ChatRow>}
      ></FlatList>
    )
  );
};

export default ChatList;

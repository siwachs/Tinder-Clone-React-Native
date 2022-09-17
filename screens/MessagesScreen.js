import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import { styles } from "../globlStyles";

//Components...
import Header from "../components/ChatsScreen/Header";
import SenderMessage from "../components/ChatsScreen/Messages/SenderMessage";
import ReceiverMessage from "../components/ChatsScreen/Messages/ReceiverMessage";

//Utilities...
import { filterUsers } from "../Utilities/multipurposeUtilities";

import useAuth from "../hooks/useAuth";

import { useRoute } from "@react-navigation/native";

//Firebase FireStore...
import { db } from "../firebaseWeb";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const MessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { userInfo } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [db, matchDetails]
  );

  const sendMessage = () => {
    addDoc(collection(db, "Matches", matchDetails.id, "messages"), {
      userId: userInfo.uid,
      displayName: userInfo.displayName,
      photoURL: matchDetails.users[userInfo.uid].photoURL,
      message: input,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <SafeAreaView style={[styles.androidSafeView]}>
      <Header
        title={filterUsers(matchDetails.users, userInfo.uid).displayName}
        callEnabled={true}
      ></Header>

      <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            keyExtractor={(item) => item.id}
            inverted={-1}
            data={messages}
            renderItem={({ item: message }) =>
              message.userId === userInfo.uid ? (
                <SenderMessage
                  key={message.id}
                  message={message}
                ></SenderMessage>
              ) : (
                <ReceiverMessage
                  key={message.id}
                  message={message}
                ></ReceiverMessage>
              )
            }
          ></FlatList>
        </TouchableWithoutFeedback>

        <View className="flex-row border-t items-center border-gray-200 px-5 py-2 justify-between bg-white">
          <TextInput
            style={{
              outline: "none",
            }}
            className="h-10 text-lg flex-1"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          ></TextInput>
          <Button color="#FF5864" title="Send" onPress={sendMessage}></Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

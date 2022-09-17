import { SafeAreaView } from "react-native";
import React from "react";

//Components...
import Header from "../components/ChatsScreen/Header";
import ChatList from "../components/ChatsScreen/ChatList";

//Android SafeView
import { styles } from "../globlStyles";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.androidSafeView}>
      <Header title="Chats"></Header>
      <ChatList></ChatList>
    </SafeAreaView>
  );
};

export default ChatScreen;

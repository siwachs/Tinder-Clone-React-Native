import { SafeAreaView } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";

//Android SafeView
import { styles } from "../globlStyles";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Context API...
import useAuth from "../hooks/useAuth";

//Components...
import Header from "../components/HomeScreen/Header";
import DeckSwiper from "../components/HomeScreen/SwiperComponents/DeckSwiper";

//Fetch Data from FireStore....
import { db } from "../firebaseWeb";
import { doc, onSnapshot } from "firebase/firestore";

const HomeScreen = () => {
  const { logOutFromGoogle, userInfo, loggedInUser } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() =>
    onSnapshot(doc(db, "Users", userInfo.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.replace("EditProfile");
      }
    })
  );

  return (
    <SafeAreaView style={styles.androidSafeView}>
      <Header logOut={logOutFromGoogle} loggedInUser={loggedInUser}></Header>

      <DeckSwiper></DeckSwiper>
    </SafeAreaView>
  );
};

export default HomeScreen;

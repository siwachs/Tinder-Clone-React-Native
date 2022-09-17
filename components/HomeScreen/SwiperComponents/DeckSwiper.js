import { View } from "react-native";
import React, { useRef, useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import Swiper from "react-native-deck-swiper";

//Components..
import Card from "./Card";
import NoCard from "./NoCard";
import BottomControls from "./BottomControls";

//Firebase FireStore...
import { db } from "../../../firebaseWeb";
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

//Utilities...
import {
  fetchMatchesUserIds,
  fetchPassedUserIds,
  generateId,
  swipeLeft,
} from "../../../Utilities/multipurposeUtilities";

//Context API...
import useAuth from "../../../hooks/useAuth";

const DeckSwiper = () => {
  const { loggedInUser, userInfo } = useAuth();
  const currentCardRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    let unsubscribe;

    const fetchCards = async () => {
      const passes = await fetchPassedUserIds(userInfo.uid);

      const matches = await fetchMatchesUserIds(userInfo.uid);

      const passedUserIds = passes.length > 0 ? passes : ["QueryForTest"];
      const matchesUserIds = matches.length > 0 ? matches : ["QueryForTest"];
      //Because we can't pass empty array for query to DBs

      unsubscribe = onSnapshot(
        query(
          collection(db, "Users"),
          where("id", "not-in", [
            ...passedUserIds,
            ...matchesUserIds,
            userInfo.uid,
          ])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      );
    };

    fetchCards();

    //Clean Listner...
    return unsubscribe;
  }, [db]);

  //Swiping Functions...
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }
    const userSwiped = profiles[cardIndex];

    await setDoc(
      doc(db, "Users", userInfo.uid, "matches", userSwiped.id),
      userSwiped
    );

    //If User you Swipe Right is also Swipe Right you.
    await getDoc(doc(db, "Users", userSwiped.id, "matches", userInfo.uid)).then(
      async (snapshot) => {
        if (snapshot.exists()) {
          //Create A Match....
          await setDoc(
            doc(db, "Matches", generateId(userInfo.uid, userSwiped.id)),
            {
              users: {
                [userInfo.uid]: loggedInUser,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [userInfo.uid, userSwiped.id],
              timestamp: serverTimestamp(),
            }
          );

          navigation.navigate("MatchScreen", {
            loggedInUser,
            userSwiped,
          });
        }
      }
    );
  };

  return (
    <>
      <View className="flex-1 -mt-11">
        <Swiper
          ref={currentCardRef}
          overlayLabels={{
            bottom: {
              title: "SKIP",
              style: {
                label: {
                  position: "absolute",
                  top: 0,
                  color: "gray",
                },
              },
            },
            top: {
              title: "SKIP",
              style: {
                label: {
                  position: "absolute",
                  bottom: 120,
                  color: "gray",
                },
              },
            },
            left: {
              title: "PASS",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          stackSize={6}
          cardIndex={0}
          animateCardOpacity
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={profiles}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex, profiles, userInfo.uid);
          }}
          onSwipedRight={(cardindex) => {
            swipeRight(cardindex);
          }}
          onSwipedTop={() => {}}
          onSwipedBottom={() => {}}
          renderCard={(card) =>
            card ? <Card card={card}></Card> : <NoCard></NoCard>
          }
        ></Swiper>
      </View>

      <BottomControls siwpeRef={currentCardRef}></BottomControls>
    </>
  );
};

export default DeckSwiper;

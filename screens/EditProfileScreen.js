import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

//Android SafeView
import { styles } from "../globlStyles";

//Loader...
import Spinner from "../components/Spinner";

//Firebase Database....
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseWeb";

//Context API
import useAuth from "../hooks/useAuth";

//Components...
import UploadImage from "../components/UploadImage";
import { fetchUser } from "../Utilities/multipurposeUtilities";

const EditProfileScreen = () => {
  const {
    userInfo,
    profileLink,
    setProfileLink,
    loggedInUser,
    setLoggedInUser,
  } = useAuth();

  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfile = () => {
    setLoading(true);

    setDoc(doc(db, "Users", userInfo.uid), {
      id: userInfo.uid,
      displayName: displayName,
      photoURL: profileLink,
      age: age,
      gender: gender,
      job: job,
      email: userInfo.email,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
        setProfileLink(null);
      })
      .catch((error) => alert(error))
      .finally(() => {
        fetchUser(userInfo.uid, setLoggedInUser);
        setLoading(false);
      });
  };

  //Customized Header....
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: Platform.OS === "web" ? true : false,
      headerTitle: "Update Your Profile",
      headerStyle: {
        backgroundColor: "#FF5864",
      },
      headerTitleStyle: "white",
    });
  });

  //Validation....
  const isFormIncomplete =
    !job === "" || !age || !profileLink || !gender === "";

  const checkAge = () => {
    if (age === "") return;
    if (age >= 1 && age <= 99) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.androidSafeView}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/Images/Tinder-logo.png")}
          style={{
            resizeMode: "contain",
          }}
          className="w-full h-20"
        ></Image>

        <Text className="text-xl text-gray-500 p-2 font-bold">
          Welcome {loggedInUser?.displayName || userInfo.displayName}
        </Text>

        <View>
          <Text className="text-center font-bold p-4 text-red-400">
            Step 1: The Profile Pic
          </Text>
          <UploadImage></UploadImage>
        </View>

        <View>
          <Text className="text-center font-bold p-4 text-red-400">
            Step 2: Display Name
          </Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            style={{ outlineStyle: "none" }}
            className="text-center pb-2 text-xl rounded-lg text-gray-500"
            placeholder="Enter Your Full Name"
          ></TextInput>
        </View>

        <View>
          <Text className="text-center font-bold p-4 text-red-400">
            Step 3: The Age
          </Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            onBlur={checkAge}
            style={{ outlineStyle: "none" }}
            className={`text-center pb-2 text-xl rounded-lg text-gray-500 ${
              isError && "border-red-400 border-b"
            }`}
            placeholder="Enter Your Age"
            keyboardType="numeric"
            maxLength={2}
          ></TextInput>
          {isError && (
            <Text className="text-sm text-red-400 text-center">
              Age Must Be A Number.
            </Text>
          )}
        </View>

        <View>
          <Text className="text-center font-bold p-4 text-red-400">
            Step 4: Gender
          </Text>
          <TextInput
            value={gender}
            onChangeText={setGender}
            style={{ outlineStyle: "none" }}
            className="text-center pb-2 text-xl rounded-lg text-gray-500"
            placeholder="Enter Your Gender"
          ></TextInput>
        </View>

        <View>
          <Text className="text-center font-bold p-4 text-red-400">
            Step 5: The Job
          </Text>
          <TextInput
            value={job}
            onChangeText={setJob}
            style={{ outlineStyle: "none" }}
            className="text-center pb-2 text-xl rounded-lg text-gray-500"
            placeholder="Enter A Occupation"
          ></TextInput>
        </View>

        {loading ? (
          <Spinner></Spinner>
        ) : (
          <TouchableOpacity
            onPress={updateUserProfile}
            className={`w-64 p-3 rounded-xl mb-10 mt-5 ${
              isFormIncomplete ? "bg-gray-400" : "bg-red-400"
            }`}
            disabled={isFormIncomplete}
          >
            <Text className="text-center text-white text-xl">
              Update Profile.
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

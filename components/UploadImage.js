import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

//Firebase Storege..
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { storage } from "../firebaseWeb";

import * as ImagePicker from "expo-image-picker";

//Loader...
import Spinner from "./Spinner";

//ContextAPI....
import useAuth from "../hooks/useAuth";

const UploadImage = () => {
  const { userInfo, setProfileLink, profileLink, loggedInUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const removePicture = async () => {
    setProfileLink(null);
  };

  const uploadToCloudStorage = async (pickerResult) => {
    setLoading(true);

    const imageRef = ref(storage, `profiles/${userInfo.uid}/profilePic`);

    const metadata = {
      contentType: "image/jpeg",
    };

    try {
      await uploadString(imageRef, pickerResult, "data_url", metadata).then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          setProfileLink(downloadURL);
        }
      );
    } catch (error) {
      setProfileLink(loggedInUser?.photoURL || userInfo.photoURL);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openImagePickerAsync = async ({}) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    uploadToCloudStorage(pickerResult.uri);
  };

  if (profileLink !== null) {
    return (
      <View>
        <TouchableOpacity onPress={removePicture}>
          <Image
            source={{ uri: profileLink }}
            className="w-80 md:w-96 h-96"
            style={{
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) return <Spinner></Spinner>;

  return (
    <TouchableOpacity
      className="w-64 md:w-96 p-3 rounded-xl bg-red-400"
      onPress={openImagePickerAsync}
    >
      <Text className="text-center text-white text-xl">
        Pick A Profile Picture.
      </Text>
    </TouchableOpacity>
  );
};

export default UploadImage;

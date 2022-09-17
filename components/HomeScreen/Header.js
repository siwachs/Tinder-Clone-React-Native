import { View, Image, TouchableOpacity } from "react-native";
import React from "react";

//Navigation...
import { useNavigation } from "@react-navigation/native";

//In-Built Icons
import Ionicons from "@expo/vector-icons/Ionicons";

//Context Api...
import useAuth from "../../hooks/useAuth";

const Header = ({ logOut, loggedInUser }) => {
  const navigation = useNavigation();
  const { loading } = useAuth();

  return (
    <View className="mx-3 mt-2 flex-row items-center justify-between fixed top-0 left-0 right-0 z-50">
      <TouchableOpacity disabled={loading} onPress={logOut} className="z-50">
        <Image
          style={{
            resizeMode: "contain",
          }}
          className="rounded-full h-12 w-12"
          source={{
            uri: loggedInUser?.photoURL,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <Image
          source={require("../../assets/Images/logo.png")}
          className="h-12 w-12"
        ></Image>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
        <Ionicons name="chatbubbles-sharp" size={46} color="#FF5864"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

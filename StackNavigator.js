import React from "react";

//Screens...
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import MatchScreen from "./screens/MatchScreen";
import SplashScreen from "./screens/SplashScreen";
import MessagesScreen from "./screens/MessagesScreen";

//React Native Navigation...
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//ContextAPI..
import useAuth from "./hooks/useAuth";

const StackNavigator = () => {
  const { userInfo, initialLoading } = useAuth();

  return (
    <Stack.Navigator>
      {initialLoading ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={SplashScreen}
        ></Stack.Screen>
      ) : !userInfo ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
          name="Login"
        ></Stack.Screen>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={HomeScreen}
              name="Home"
            ></Stack.Screen>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={ChatScreen}
              name="Chats"
            ></Stack.Screen>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={MessagesScreen}
              name="Messages"
            ></Stack.Screen>
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              presentation: "modal",
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="EditProfile"
              component={EditProfileScreen}
            ></Stack.Screen>
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MatchScreen"
              component={MatchScreen}
            ></Stack.Screen>
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

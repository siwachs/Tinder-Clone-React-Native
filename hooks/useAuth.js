import React, { createContext, useContext, useState, useEffect } from "react";

//Optimization... (Memoization) //If any of State change the entire tree re-render...
import { useMemo } from "react";

//Firebase...
import { auth } from "../firebaseWeb";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

//Google Login for IOS/Android
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

//Utils...
import { fetchUser } from "../Utilities/multipurposeUtilities";

//Env...
import { androidClientId, iosClientId, expoClientId, webClientId } from "@env";

const AuthContext = createContext({
  //init state...
});

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileLink, setProfileLink] = useState(null);

  //Fix Login Delay...
  const [initialLoading, setInitialLoading] = useState(true);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    expoClientId: expoClientId,
    webClientId: webClientId,
  });

  useEffect(
    () =>
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUserInfo(currentUser);
          fetchUser(currentUser.uid, setLoggedInUser);
        } else {
          setUserInfo(false);
          setLoggedInUser(null);
        }

        setInitialLoading(false);
      }),
    []
  );

  useEffect(() => {
    if (response?.type === "success") {
      try {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      } catch (error) {
        setError(error);
      }
    }
  }, [response]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logOutFromGoogle = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const memoedValue = useMemo(
    () => ({
      userInfo,
      signInWithGoogle,
      logOutFromGoogle,
      error,
      loading,
      initialLoading,
      profileLink,
      setProfileLink,
      loggedInUser,
      setLoggedInUser,
    }),
    [
      loading,
      userInfo,
      error,
      initialLoading,
      profileLink,
      loggedInUser,
      setLoggedInUser,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

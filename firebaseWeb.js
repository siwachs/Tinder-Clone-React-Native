import { initializeApp, getApp, getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Env..
import { firebaseApiKey } from "@env";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "tinder-b0306.firebaseapp.com",
  projectId: "tinder-b0306",
  storageBucket: "tinder-b0306.appspot.com",
  messagingSenderId: "793665628627",
  appId: "1:793665628627:web:45f39be7636062ebc32726",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };

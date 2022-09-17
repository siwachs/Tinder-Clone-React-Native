import { db } from "../firebaseWeb";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

//Generate Id to connect Two Users...
const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

//Remove Logged UID....
const filterUsers = (users, userLoggedInId) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedInId];

  const [id, user] = Object.entries(newUsers).flat();
  return { id, ...user };
};

//Fetch LoggedIn User Profile...
const fetchUser = async (uid, setLoggedInUser) => {
  await getDoc(doc(db, "Users", uid)).then((snapshot) => {
    if (snapshot.exists()) {
      setLoggedInUser(snapshot.data());
    }
  });
};

//Fetch Passed Uids...
const fetchPassedUserIds = async (uid) => {
  const passes = await getDocs(collection(db, "Users", uid, "passes")).then(
    (snapshot) => snapshot.docs.map((doc) => doc.id)
  );

  return passes;
};

const fetchMatchesUserIds = async (uid) => {
  const matches = await getDocs(collection(db, "Users", uid, "matches")).then(
    (snapshot) => snapshot.docs.map((doc) => doc.id)
  );

  return matches;
};

//Swiping Functions...
const swipeLeft = async (cardIndex, profiles, uid) => {
  if (!profiles[cardIndex]) {
    return;
  }
  const userSwiped = profiles[cardIndex];
  await setDoc(doc(db, "Users", uid, "passes", userSwiped.id), userSwiped);
};

export {
  generateId,
  filterUsers,
  fetchUser,
  fetchPassedUserIds,
  fetchMatchesUserIds,
  swipeLeft,
};

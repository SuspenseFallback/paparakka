// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import food from "./food";

import fuzzysort from "fuzzysort";

// initialize

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// AUTHENTICATION

export const signUpWithEmail = async (username, email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    const user = doc(db, "users", data.user.uid);

    await setDoc(user, {
      username: username,
      email: email,
      history: [],
      id: data.user.uid,
    });

    return { data, error: false };
  } catch (err) {
    return { data: {}, error: err };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return { data, error: false };
  } catch (err) {
    return { data: {}, error: err };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: false };
  } catch (err) {
    return { error: err };
  }
};

export const getUser = async (callback) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// SETS

export const addSet = async (data) => {
  const id = uuidv4();
  const docRef = doc(db, "sets", id);

  try {
    await setDoc(docRef, {
      title: data.title,
      description: data.description,
      tags: data.tags,
      flashcards: data.flashcards,
      owner: data.owner,
      ownerName: data.ownerName,
      id: id,
      time: new Date().toUTCString(),
    });
    return { id, error: false };
  } catch (err) {
    return { id: null, error: err };
  }
};

export const updateSet = async (data, set_id, user) => {
  const docRef = doc(db, "sets", set_id);

  try {
    await updateDoc(docRef, {
      title: data.title,
      description: data.description,
      tags: data.tags,
      flashcards: data.flashcards,
      owner: data.owner,
      ownerName: data.ownerName,
      id: set_id,
      time: new Date().toUTCString(),
    });

    await updateStudiedSets(user, set_id, data.flashcards);
    return { error: false };
  } catch (err) {
    return { error: err };
  }
};

export const deleteSet = async (set_id, user_id) => {
  const set_doc = doc(db, "sets", set_id);
  const user_doc = doc(db, "users", user_id);

  try {
    // The security rules will enforce that only the owner can delete the set.
    await deleteDoc(set_doc);

    // Also remove the set from the user's studied_sets list.
    const user_snap = await getDoc(user_doc);
    if (user_snap.exists()) {
      const user_data = user_snap.data();
      if (user_data.studied_sets) {
        const new_studied_sets = user_data.studied_sets.filter(
          (s) => s.id !== set_id
        );
        await updateDoc(user_doc, {
          studied_sets: new_studied_sets,
        });
      }
    }

    return "200";
  } catch (error) {
    console.error("Error deleting set: ", error);
    return "401"; // Or re-throw the error, depending on desired error handling.
  }
};

export const getAllSets = async () => {
  try {
    const data = await getDocs(collection(db, "sets"));
    let docs = [];

    data.docs.forEach((set) => {
      docs.push(set.data());
    });

    return { sets: docs, error: false };
  } catch (err) {
    return { sets: [], error: err };
  }
};

export const getSet = async (id) => {
  const docRef = doc(db, "sets", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getOwnerSets = async (id) => {
  const { sets, error } = await getAllSets();
  if (error) {
    return { sets: [], error };
  }
  const matches = searchSetsByOwnerId(sets, id);
  return { sets: matches, error: false };
};

export const searchSetTitles = async (target) => {
  const { sets, error } = await getAllSets();
  if (error) {
    return { sets: [], error };
  }
  const matches = searchSets(sets, target);
  return { sets: matches, error: false };
};

function searchSets(array, target) {
  const titles = array.map(({ title }) => title);

  const result = fuzzysort.go(target, titles, { allowTypo: true });
  let results = [];

  result.forEach((res) => {
    const newlist = array.filter((s) => s.title == res.target);
    results = results.concat(newlist);
  });

  return results;
}

function searchSetsByOwnerId(array, id) {
  const matches = [];

  array.forEach((set) => {
    if (set.owner === id) {
      matches.push(set);
    }
  });

  return matches;
}

// ANALYTICS

export const logData = (data) => {
  logEvent(analytics, data);
};

// HISTORY

export const addHistory = async (id) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          let history = userData.history || [];

          // Remove the set if it already exists in the history
          history = history.filter((set) => set.id !== id);

          const set = await getSet(id);
          if (set) {
            // Remove flashcards before adding to history
            delete set.flashcards;
            history.unshift(set);

            // Keep history to a reasonable length (e.g., 20 items)
            if (history.length > 20) {
              history.pop();
            }

            await updateDoc(userDocRef, { history });
          }
        }
      } catch (error) {
        console.error("Error adding to history:", error);
      }
    }
  });
};

// STUDIED SETS

export const addStudiedSets = async (user, set_id) => {
  try {
    const set = await getSet(set_id);
    if (!set) {
      throw new Error("Set not found");
    }

    const docRef = doc(db, "users", user.id);
    let studied_sets = user.studied_sets ? [...user.studied_sets] : [];
    let cards = [...set.flashcards];

    const existing_set = studied_sets.find((s) => s.id === set_id);
    if (existing_set) {
      cards = [...existing_set.flashcards];
    }

    studied_sets = studied_sets.filter((s) => s.id !== set_id);

    studied_sets.unshift({
      ...set,
      flashcards: cards,
      time: new Date().toUTCString(),
    });

    await updateDoc(docRef, {
      studied_sets: studied_sets,
    });

    return { cards, error: false };
  } catch (err) {
    return { cards: [], error: err };
  }
};

export const updateStudiedSets = async (user, set_id, cards) => {
  try {
    const set = await getSet(set_id);
    if (!set) {
      throw new Error("Set not found");
    }

    const docRef = doc(db, "users", user.id);
    let studied_sets = user.studied_sets ? [...user.studied_sets] : [];
    const new_set = { ...set, flashcards: cards };

    studied_sets = studied_sets.filter((s) => s.id !== set_id);

    studied_sets.unshift(new_set);

    await updateDoc(docRef, {
      studied_sets: studied_sets,
    });

    return { error: false };
  } catch (err) {
    return { error: err };
  }
};

// set rating

export const updateSetRating = async (set_id, newRating) => {
  const setDocRef = doc(db, "sets", set_id);

  try {
    const setSnap = await getDoc(setDocRef);
    if (setSnap.exists()) {
      const setData = setSnap.data();
      const currentRating = setData.rating || 0;
      const numberOfRatings = setData.number_of_ratings || 0;

      const newNumberOfRatings = numberOfRatings + 1;
      const newTotalRating = currentRating * numberOfRatings + newRating;
      const newAverageRating = newTotalRating / newNumberOfRatings;

      await updateDoc(setDocRef, {
        rating: parseFloat(newAverageRating.toFixed(1)),
        number_of_ratings: newNumberOfRatings,
      });
    } else {
      // If the set doesn't exist, maybe create it or handle the error.
      // For now, we'll just log an error.
      console.error("Set not found for rating update:", set_id);
    }
  } catch (error) {
    console.error("Error updating set rating:", error);
  }
};

// get all users studied cards number

export const getNumberOfUsers = async () => {
  try {
    const data = await getDocs(collection(db, "users"));
    return { count: data.docs.length, error: false };
  } catch (err) {
    return { count: 0, error: err };
  }
};


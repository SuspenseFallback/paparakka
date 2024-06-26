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

export const signUpWithEmail = (username, email, password, callback) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
      const user = doc(db, "users", data.user.uid);

      console.log(data);

      setDoc(user, {
        username: username,
        email: email,
        history: {},
        id: data.user.uid,
      }).then((db_data) => {
        callback(data, false);
      });
    })
    .catch((err) => {
      callback({}, err);
    });
};

export const signInWithEmail = (email, password, callback) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
      callback(data, "");
    })
    .catch((err) => {
      callback({}, err);
    });
};

export const logOut = (callback) => {
  signOut(auth).then(() => {
    callback();
  });
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

export const addSet = (data, callback) => {
  const id = uuidv4();
  const docRef = doc(db, "sets", id);

  setDoc(docRef, {
    title: data.title,
    description: data.description,
    tags: data.tags,
    flashcards: data.flashcards,
    owner: data.owner,
    ownerName: data.ownerName,
    id: id,
    time: new Date().toUTCString(),
  })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};

export const updateSet = async (data, set_id, user) => {
  const docRef = doc(db, "sets", set_id);

  updateDoc(docRef, {
    title: data.title,
    description: data.description,
    tags: data.tags,
    flashcards: data.flashcards,
    owner: data.owner,
    ownerName: data.ownerName,
    id: set_id,
    time: new Date().toUTCString(),
  })
    .then((new_data) => {
      updateStudiedSets(user, set_id, data.flashcards, () => {
        return new_data;
      });
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteSet = async (set_id, user_id) => {
  const set_doc = doc(db, "sets", set_id);
  const user_doc = doc(db, "user", user_id);
  let user = null;
  getUser((data) => {
    user = data;
  });

  const set = await getSet(set_id);

  if (set.owner == user_id) {
    await deleteDoc(set_doc);
    const new_studied_sets = [...user.studied_sets];
    const naya = new_studied_sets.filter((s) => s.id != set_id);
    console.log(naya);
    updateDoc(user_doc, {
      studied_sets: naya,
    });

    return "200";
  } else {
    return "401";
  }
};

export const getAllSets = (callback) => {
  getDocs(collection(db, "sets")).then((data) => {
    let docs = [];

    data.docs.forEach((set) => {
      docs.push(set.data());
    });

    callback(docs);
  });
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

export const getOwnerSets = (id, callback) => {
  getAllSets((sets) => {
    const matches = searchSetsByOwnerId(sets, id);

    callback(matches);
  });
};

export const searchSetTitles = (target, callback) => {
  getAllSets((data) => {
    console.log(data);
    const matches = searchSets(data, target);

    callback(matches);
  });
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

export const addHistory = (id) => {
  // see if user is authenticated
  getUser((user) => {
    // if they are, proceed
    if (user) {
      // fetch user doc
      const document = doc(db, "users", user.id);

      getDoc(document).then((res) => {
        // doc data
        const data = res.data();

        // different actions for history length
        let history =
          data.history.length > 0
            ? data.history.filter((set) => set.id !== id)
            : [];

        getSet(id).then((data) => {
          delete data.flashcards;
          history.splice(0, 0, data);

          updateDoc(document, {
            history: history,
          });
        });
      });
    }
  });
};

// STUDIED SETS

export const addStudiedSets = (user, set_id, callback) => {
  getSet(set_id).then((set) => {
    const docRef = doc(db, "users", user.id);

    let studied_sets = user.studied_sets ? [...user.studied_sets] : [];
    let cards = [...set.flashcards];

    studied_sets.forEach((mod_set) => {
      if (mod_set.id === set_id) {
        console.log(mod_set);
        cards = [...mod_set.flashcards];
      }
    });

    console.log(cards);

    studied_sets = studied_sets.filter((fil_set) => fil_set.id !== set_id);

    studied_sets.splice(0, 0, {
      ...set,
      flashcards: cards,
      time: new Date().toUTCString(),
    });

    updateDoc(docRef, {
      studied_sets: studied_sets,
    }).then(callback(cards));
  });
};

export const updateStudiedSets = (user, set_id, cards, callback) => {
  getSet(set_id).then((set) => {
    const docRef = doc(db, "users", user.id);
    let studied_sets = user.studied_sets ? [...user.studied_sets] : [];
    const new_set = { ...set, flashcards: cards };

    studied_sets = studied_sets.filter((set) => set.id !== set_id);

    studied_sets.splice(0, 0, {
      ...new_set,
    });

    updateDoc(docRef, {
      studied_sets: studied_sets,
    }).then(callback());
  });
};

// set rating

export const updateSetRating = async (set_id, newRating) => {
  const setDoc = doc(db, "sets", set_id);

  const { rating, number_of_ratings } = getDoc(setDoc);

  if (rating && number_of_ratings) {
    updateDoc(setDoc, {
      rating: parseFloat(
        (
          (rating * number_of_ratings + newRating) / number_of_ratings +
          1
        ).toFixed(1)
      ),
      number_of_ratings: number_of_ratings + 1,
    });
  } else {
    updateDoc(setDoc, {
      rating: newRating,
      number_of_ratings: 1,
    });
  }
};

// get all users studied cards number

export const getNumberOfUsers = async (callback) => {
  getDocs(collection(db, "users")).then((data) => {
    let docs = [];

    data.docs.forEach((set) => {
      docs.push(set.data());
    });

    callback(docs.length);
  });
};

// const processFood = async () => {
//   const lines = food.split("\n");
//   const cards = [];

//   lines.forEach((line, index) => {
//     const card = {
//       term: "",
//       definition: "",
//       proficiency: "hard1",
//       times_revised: 0,
//       index: index,
//     };

//     const split = line.split(" ");

//     card.definition = split[0].trim();
//     split.splice(0, 1);

//     card.term = split.join(" ");
//     cards.push(card);
//   });
//   const docRef = doc(db, "sets", "1ade4d71-d1b1-4cfb-9074-8ce20c9b6e7c");
//   updateDoc(docRef, { flashcards: cards });

//   console.log("Completed");
// };

// processFood();

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
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
        cards = [...mod_set.flashcards];
      }
    });

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

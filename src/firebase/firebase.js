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

// initialize

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// AUTHENTICATION

export const signUpWithEmail = (username, email, password, callback) => {
  createUserWithEmailAndPassword(auth, email, password).then((data) => {
    const user = doc(db, "users", data.user.uid);

    console.log(data);

    setDoc(user, {
      username: username,
      email: email,
      history: {},
      id: data.user.uid,
    }).then(() => {
      callback();
    });
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
    time: new Date().toTimeString(),
  })
    .then((data) => {
      callback(data);
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
  const matches = [];

  array.forEach((set) => {
    if (set.title.toLowerCase().includes(target.toLowerCase())) {
      matches.push(set);
    }
  });

  return matches;
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
  getUser((user) => {
    if (user) {
      const document = doc(db, "users", user.id);

      getDoc(document).then((res) => {
        const data = res.data();

        if (data.history) {
          let history = data.history.filter((set) => set.id !== id);

          getSet(id).then((data) => {
            history.splice(0, 0, data);

            updateDoc(document, {
              history: history,
            });
          });
        } else {
          const history = [];

          getSet(id).then((data) => {
            history.push(data);

            updateDoc(document, {
              history: history,
            });
          });
        }
      });
    }
  });
};

export const addStudiedSets = (user, set_id, callback) => {
  getSet(set_id).then((set) => {
    const docRef = doc(db, "users", user.id);
    let studied_sets = user.studied_sets ? [...user.studied_sets] : [];

    studied_sets = studied_sets.filter((set) => set.id !== set_id);

    studied_sets.splice(0, 0, {
      ...set,
    });

    updateDoc(docRef, {
      studied_sets: studied_sets,
    }).then(callback());
  });
};

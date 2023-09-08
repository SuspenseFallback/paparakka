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

const firebaseConfig = {
  apiKey: "AIzaSyBDDnTcl8GOlnc0jQe28QpXz-h_Mpbf9PE",
  authDomain: "flashcard-app-e33db.firebaseapp.com",
  projectId: "flashcard-app-e33db",
  storageBucket: "flashcard-app-e33db.appspot.com",
  messagingSenderId: "522279942618",
  appId: "1:522279942618:web:a30811904d3e958dda68e3",
  measurementId: "G-53SC9NQER5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

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
    if (set.owner == id) {
      matches.push(set);
    }
  });

  return matches;
}

export const logData = (data) => {
  logEvent(analytics, data);
};

export const addHistory = (id) => {
  getUser((user) => {
    if (user) {
      const document = doc(db, "users", user.id);

      getDoc(document).then((res) => {
        const data = res.data();

        if (data.history) {
          let history = data.history.filter((set) => set.id != id);

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

export const addStudiedSets = (id, user_id) => {
  const document = doc(db, "users", user_id);

  getDoc(document).then((res) => {
    const data = res.data();

    if (data.studied_sets) {
      let studied_sets = data.studied_sets.filter((set) => set.id != id);

      getSet(id).then((data) => {
        studied_sets.splice(0, 0, {
          ...data,
          time: new Date().toDateString(),
        });

        updateDoc(document, {
          studied_sets: studied_sets,
        });
      });
    } else {
      const studied_sets = [];

      getSet(id).then((data) => {
        studied_sets.push({ ...data, time: new Date().toDateString() });

        updateDoc(document, {
          studied_sets: studied_sets,
        });
      });
    }
  });
};

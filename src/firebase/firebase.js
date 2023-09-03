// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
  signInWithEmailAndPassword(email, password, (data, err) => {
    console.log(data, err);
  });
};

export const logOut = (callback) => {};

export const getUser = async (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });
};

export const addDeck = (data, callback) => {
  const id = uuidv4();
  const docRef = doc(db, "decks", id);

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

export const getAllDecks = (callback) => {
  getDocs(collection(db, "decks")).then((data) => {
    let docs = [];

    data.docs.forEach((deck) => {
      docs.push(deck.data());
    });

    callback(docs);
  });
};

export const getDeck = async (id) => {
  const docRef = doc(db, "decks", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const searchDeckTitles = (target, callback) => {
  getAllDecks((data) => {
    console.log(data);
    const matches = searchDecks(data, target);

    callback(matches);
  });
};

function searchDecks(array, target) {
  const matches = [];

  array.forEach((deck) => {
    if (deck.title.toLowerCase().includes(target.toLowerCase())) {
      matches.push(deck);
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
          let history = data.history.filter((deck) => deck.id != id);

          getDeck(id).then((data) => {
            history.splice(0, 0, data);

            updateDoc(document, {
              history: history,
            });
          });
        } else {
          const history = [];

          getDeck(id).then((data) => {
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

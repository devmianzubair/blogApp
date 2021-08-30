import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDBYVL41V8tqDGMTlA5j_ZVAXaJMTtI8KU",
  authDomain: "myblog-b4bd0.firebaseapp.com",
  projectId: "myblog-b4bd0",
  storageBucket: "myblog-b4bd0.appspot.com",
  messagingSenderId: "932350445319",
  appId: "1:932350445319:web:4ebfaef91f4bdb543fe7a2",
  measurementId: "G-TCW9V4SX85"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshot: true });

export default firebase;

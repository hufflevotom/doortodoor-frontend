import firebase from "firebase/app";
import "firebase/database";

function FirebaseConfig() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC6USsxj2-wP_fJSjSMnqAR8zNZsNuY0yA",
    authDomain: "door-to-door-601a5.firebaseapp.com",
    databaseURL: "https://door-to-door-601a5-default-rtdb.firebaseio.com",
    projectId: "door-to-door-601a5",
    storageBucket: "door-to-door-601a5.appspot.com",
    messagingSenderId: "585032535116",
    appId: "1:585032535116:web:01ac5f39899f2ca93238e9",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  return firebase.database();
}

export default FirebaseConfig;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAjOT3KC2E4iS3MdLQWpJGvZVzLmyRu9IQ",
  authDomain: "phonebook-8fa97.firebaseapp.com",
  databaseURL: "https://phonebook-8fa97.firebaseio.com",
  projectId: "phonebook-8fa97",
  storageBucket: "phonebook-8fa97.appspot.com",
  messagingSenderId: "520624067877",
  appId: "1:520624067877:web:5401985806ff8202"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase

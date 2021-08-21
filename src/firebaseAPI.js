import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyA1msmPQlh5Ol8hKrgfPHOkMrw_JwAU6jQ",
    authDomain: "chatting-7d74a.firebaseapp.com",
    projectId: "chatting-7d74a",
    storageBucket: "chatting-7d74a.appspot.com",
    messagingSenderId: "1059321453669",
    appId: "1:1059321453669:web:217c49e2ac3967d2e3ba8c",
    measurementId: "G-Q6Z7VLEQLY"
  };
  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  else {
      firebase.app();
  }
 
export default firebase;
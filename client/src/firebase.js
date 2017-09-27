import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC2rf7NT_vVD9E7-CFAPAsLExJG0IPGxf8",
  authDomain: "trove-app.firebaseapp.com",
  databaseURL: "https://trove-app.firebaseio.com",
  projectId: "trove-app",
  storageBucket: "trove-app.appspot.com",
  messagingSenderId: "50556960736"
}; 

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;
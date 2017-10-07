import firebase from 'firebase'

// Initialize Firebase
const config = {
  // Initialize Firebase
  
    apiKey: "AIzaSyDmYTml4NoIdQccWLUbXyXpRwE248DkjOM",
    authDomain: "throv-featchat.firebaseapp.com",
    databaseURL: "https://throv-featchat.firebaseio.com",
    projectId: "throv-featchat",
    storageBucket: "",
    messagingSenderId: "154902242101"

  // apiKey: "AIzaSyC2rf7NT_vVD9E7-CFAPAsLExJG0IPGxf8",
  // authDomain: "trove-app.firebaseapp.com",
  // databaseURL: "https://trove-app.firebaseio.com",
  // projectId: "trove-app",
  // storageBucket: "trove-app.appspot.com",
  // messagingSenderId: "50556960736"
}; 

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;
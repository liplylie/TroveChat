import firebase from 'firebase'
import secret from '../../../sensitive.json'

// Initialize Firebase
const config = {
  // Initialize Firebase
  
    apiKey: secret.apiKey,
    authDomain: secret.authDomain,
    databaseURL: secret.databaseURL,
    projectId: secret.projectId,
    storageBucket: "",
    messagingSenderId: secret.messagingSenderId

  
}; 

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;
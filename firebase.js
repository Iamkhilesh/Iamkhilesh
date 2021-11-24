// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDxKxZTEOB8vAtkY0lSUC13R5INUzGbpOU',
  authDomain: 'findpro-a99f2.firebaseapp.com',
  projectId: 'findpro-a99f2',
  storageBucket: 'findpro-a99f2.appspot.com',
  messagingSenderId: '1033851300109',
  appId: '1:1033851300109:web:db0b6c24b576e9c6816844',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const storage = firebase.storage();

export { storage };
export { auth };

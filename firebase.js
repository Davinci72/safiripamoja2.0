// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRHxTPU5LMiGWvS9txHD6xMePsZhHsu6Q",
  authDomain: "fir-auth-ff4d0.firebaseapp.com",
  projectId: "fir-auth-ff4d0",
  storageBucket: "fir-auth-ff4d0.appspot.com",
  messagingSenderId: "450015802258",
  appId: "1:450015802258:web:f528f50321892d189d074b"
};
let app;

if(firebase.apps.length === 0){
app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
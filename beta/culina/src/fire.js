import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyApDpIPyzkULOOLFpj2-_JNocvM79aOjLE",
    authDomain: "culina-e7a1d.firebaseapp.com",
    databaseURL: "https://culina-e7a1d.firebaseio.com",
    projectId: "culina-e7a1d",
    storageBucket: "culina-e7a1d.appspot.com",
    messagingSenderId: "135402254260",
    appId: "1:135402254260:web:c6393d6aa202910efb8ce1",
    measurementId: "G-52L2VSLHW5"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;
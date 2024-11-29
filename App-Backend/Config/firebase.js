const { initializeApp, getApps } = require("firebase/app");
require("dotenv").config();
const { getFirestore } = require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCiT8EeHT7uZd1CtzAKa26ZckH9u7UxzEY",
  authDomain: "employee-app-ef749.firebaseapp.com",
  projectId: "employee-app-ef749",
  storageBucket: "employee-app-ef749.appspot.com",
  messagingSenderId: "406388108909",
  appId: "1:406388108909:web:ca49e7461b8a71a60e1964",
  measurementId: "G-7GYYQ17N3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
    db
}
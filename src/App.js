import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ProtectedScreen from "./screens/ProtectedScreen";
import HomePage from "./screens/HomePage";
import Navbar from "./components/Navbar";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDvzi-Yx-rOVV1A5hiwl8f1Xa_qFy-sCR0",
	authDomain: "hobbysport-91224.firebaseapp.com",
	projectId: "hobbysport-91224",
	storageBucket: "hobbysport-91224.appspot.com",
	messagingSenderId: "234830154797",
	appId: "1:234830154797:web:28c27ca8a788502ea33ca4",
	measurementId: "G-DNMPRXQ6HT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/protected" element={<ProtectedScreen />} />
			</Routes>
		</>
	);
}

export default App;

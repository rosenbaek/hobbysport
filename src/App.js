import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProtectedScreen from "./screens/ProtectedScreen";
import HomePage from "./screens/HomePage";
import Navbar from "./components/Navbar";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
	apiKey: "AIzaSyDvzi-Yx-rOVV1A5hiwl8f1Xa_qFy-sCR0",
	authDomain: "hobbysport-91224.firebaseapp.com",
	projectId: "hobbysport-91224",
	storageBucket: "hobbysport-91224.appspot.com",
	messagingSenderId: "234830154797",
	appId: "1:234830154797:web:28c27ca8a788502ea33ca4",
	measurementId: "G-DNMPRXQ6HT",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	return (
		<>
			<Navbar auth={auth} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/protected" element={<ProtectedScreen />} />
			</Routes>
		</>
	);
}

export default App;

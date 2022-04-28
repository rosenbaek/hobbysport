import React from "react";
import firebase from "firebase/compat/app";
import { firestore } from "../firebase";
import { collection } from "firebase/firestore";

export const SignIn = (props) => {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		props.auth
			.signInWithPopup(provider)
			.then((result) => {
				let user = { email: result.user.email, name: result.user.displayName };
				firestore
					.collection("users")
					.doc(user.email)
					.set(user, { merge: true });
			})
			.catch((error) => {
				props.toast.error("Failed login");
			});
	};
	return (
		<>
			<button onClick={signInWithGoogle}>Log In</button>
		</>
	);
};

export const SignOut = (props) => {
	return (
		props.auth.currentUser && (
			<button onClick={() => props.auth.signOut()}>Log Ud</button>
		)
	);
};

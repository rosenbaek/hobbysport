import React from "react";
import firebase from "firebase/compat/app";

export const SignIn = (props) => {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		props.auth.signInWithPopup(provider);
	};
	return (
		<>
			<button className="px-5" onClick={signInWithGoogle}>
				Sign In
			</button>
		</>
	);
};

export const SignOut = (props) => {
	return (
		props.auth.currentUser && (
			<button className="px-5" onClick={() => props.auth.signOut()}>
				Sign Out
			</button>
		)
	);
};

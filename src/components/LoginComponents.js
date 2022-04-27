import React from 'react';
import firebase from 'firebase/compat/app';

export const SignIn = (props) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
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

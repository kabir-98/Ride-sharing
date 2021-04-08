import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebase.config";

export const initializeLoginFramework = () =>{
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
}


export  const handelGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {

      })
  }

export const handelSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
    const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    }
    return signedOutUser;
    })
    .catch(err => {

    })
  }

export const createUserWithEmailAndPassword = (displayName, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(displayName);
        await res.user.updateProfile({displayName})
        return newUserInfo;
    })
    .catch(error => {
        console.log({error});
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const updateUserName = displayName => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: displayName
    })
      .then(function () {
        console.log('Successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
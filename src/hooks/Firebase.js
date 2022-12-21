import React, { useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { createContext, useContext, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';
const FirebaseContext = createContext(null);

// Optionally import the services that you want to use
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { uuidv4 } from "@firebase/util";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9O76SPnwKagIQBcIq0QXR85ftQCj1xew",
  authDomain: "budget-tracker-c3df9.firebaseapp.com",
  databaseURL: "https://budget-tracker-c3df9-default-rtdb.firebaseio.com",
  projectId: "budget-tracker-c3df9",
  storageBucket: "budget-tracker-c3df9.appspot.com",
  messagingSenderId: "613333563493",
  appId: "1:613333563493:web:71192ff042fc4f8142ee8c"
};

const firebaseFunctions = (() => {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  var uid = null;
  var activeGroup = null;
  const auth = getAuth();
  let currentUser = auth.currentUser;

  

  return {
    

    
    getCurrentUser: () => {
      console.log(currentUser);
      return currentUser;
    },
    
    signIn: (email, password, setSignedIn) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        currentUser = userCredential.user;
        setSignedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    },

    signOut: (setSignedIn) => {
      signOut(auth).then(() => {
        setSignedIn(false);
        console.log("Signing out")

      }).catch((error) => {
        console.log(error);
      });
    },
   
    addItem: () => {

    },
    addTransaction: (amount, description, expense, date) => {
      const transactionUUID = uuidv4();
      console.log(date);
      set(ref(database, 'transactions/' + activeGroup + '/' + transactionUUID), {
        amount: amount,
        date: date.getTime(),
        description: description,
        expense: expense,
        uuid: transactionUUID,
        timestamp: new Date().getTime()
      });
    },
    addIncome: (amount, date) => {
      const incomeUUID = uuidv4();
      set(ref(database, 'users/' + uid + '/income/' + incomeUUID), {
        amount: amount,
        date: date.getTime(),
        uuid: incomeUUID
      });
    },

    removeItem: () => {

    },
    updateItem: () => {
      
    },
    readName: () => {
      console.log("yeet");
      const testRef = ref(database, `/users/${uid}`);
      onValue(testRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      })

    },
  }
})()

export const FirebaseProvider = ({children}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [currentUser, setCurrentUser ] = useState(null);
  const [firebase] = useState(firebaseFunctions);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
    } else {
      setCurrentUser(null);
    }
  });


  state = {
    firebase: firebase,
    signedIn: signedIn,
    setSignedIn: setSignedIn,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser
  }

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext);

export default useFirebase;
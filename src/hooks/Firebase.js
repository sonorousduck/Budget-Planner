import { initializeApp } from 'firebase/app';
import { createContext, useContext, useMemo, useState } from 'react';

const FirebaseContext = createContext(null)

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB9O76SPnwKagIQBcIq0QXR85ftQCj1xew',
  authDomain: "budget-tracker-c3df9.firebaseapp.com",
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: "budget-tracker-c3df9",
  storageBucket: "budget-tracker-c3df9.appspot.com",
  messagingSenderId: "613333563493",
  appId: "1:613333563493:web:71192ff042fc4f8142ee8c",
  measurementId: 'G-measurement-id',
};

const stuff = (() => {
  initializeApp(firebaseConfig);

  return {
    addItem: () => {

    },
    removeItem: () => {

    },
    updateItem: () => {

    },
  }
})()

export const FirebaseProvider = ({children}) => {
  const [firebase] = useState(stuff)

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)

export default useFirebase
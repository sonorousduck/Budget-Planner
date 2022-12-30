import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { createContext, useContext, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';
const FirebaseContext = createContext(null);

// Optionally import the services that you want to use
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, update, query, orderByChild, remove } from "firebase/database";
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
  // const auth = getAuth();
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
  let currentUser = auth.currentUser;
  var activeGroup = currentUser;
  

  return {
    getCurrentUser: () => {
      return currentUser;
    },
    
    signIn: (email, password, setSignedIn) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        currentUser = userCredential.user;
        activeGroup = currentUser;
        setSignedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    },

    createUser: (name, email, password) => {
      console.log("create user called")
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          currentUser = userCredential.user;
          // Keep the @email because there isn't a way to check if they already exist better than this I think... 
          // But you have to get rid of .com since . isn't allowed.
          const uid = email.substring(0, email.indexOf('.'));
          // Create the user in the database too
          set(ref(database, 'users/' + uid), {
            name: name,
            email: email,
            categories: {
              Groceries: true,
              Rent: true,
            },
            groups: {
              default: true
            },
            currentGroup: {
              default: true,
            }
          })

      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
      })
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
    addTransaction: (amount, description, optionalDetails, expense, date, activeGroup) => {
      const transactionUUID = uuidv4();
      activeGroup = activeGroup.email.substring(0, activeGroup.email.indexOf('.'));

      let currentMonth = date.getMonth() + 1;

      set(ref(database, 'transactions/' + activeGroup + '/' + date.getFullYear() + '/' + currentMonth + '/' + transactionUUID), {
        amount: amount,
        date: date.getTime(),
        description: description,
        optionalDetails: optionalDetails,
        expense: expense,
        uuid: transactionUUID,
        timestamp: new Date().getTime()
      });
    },
    addIncome: (amount, date) => {
      const incomeUUID = uuidv4();
      set(ref(database, 'transactions/' + activeGroup + '/income/' + date.getYear() + '/' + date.getMonth() + 1 + '/' + incomeUUID), {
        amount: amount,
        date: date.getTime(),
        uuid: incomeUUID
      });
    },

    getCurrentMonthTransactions: (activeGroup, currentTransactions, setCurrentTransactions) => {
      if (activeGroup.email)
      {
        let email = activeGroup.email;        
        let date = new Date();
        let currentMonth = date.getMonth() + 1;
        email = email.substring(0, email.indexOf('.'));
  
        const transactionsRef = query(ref(database, 'transactions/' + email + '/' + date.getFullYear() + '/' + currentMonth), orderByChild('timestamp'));
        onValue(transactionsRef, (snapshot) => {
          const dataArray = [];
          snapshot.forEach((child) => {
            dataArray.unshift(child.val())
          })
          setCurrentTransactions(dataArray);
        });
      }

    },

    getTransactions: (year, month, activeGroup) => {
      const transactionsRef = ref(database, '')

    },

    deleteTransaction: (email, dateTransaction, uuid) => {
      email = email.substring(0, email.indexOf('.'));
      let date = new Date(dateTransaction);
      let currentMonth = date.getMonth() + 1;
      let year = date.getFullYear();
      remove(ref(database, 'transactions/' + email + '/' + year + '/' + currentMonth + '/' + uuid))
    },

    updateTransaction: (email, description, expense, amount, date, optionalDetails, uuid) => {
      email = email.substring(0, email.indexOf('.'));
      let incomingDate = new Date(date);
      let currentMonth = incomingDate.getMonth() + 1;
      let year = incomingDate.getFullYear();

      const transaction = {
        description: description,
        amount: amount,
        expense: expense,
        date: date,
        optionalDetails: optionalDetails,
        uuid: uuid
      }

      update(ref(database, 'transactions/' + email + '/' + year + '/' + currentMonth + '/' + uuid), transaction)
    },

    removeItem: () => {

    },
    updateItem: () => {
      
    },
    readName: () => {
      const testRef = ref(database, `/users/${uid}`);
      onValue(testRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Still need to do something with: " + data);

      })

    },
  }
})()

export const FirebaseProvider = ({children}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [currentUser, setCurrentUser ] = useState(null);
  const [firebase] = useState(firebaseFunctions);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
      // setCurrentGroup(user.email);
    } else {
      setCurrentUser(null);
    }
  });

  useEffect(() => {
    if (currentUser) {
      setCurrentGroup(currentUser.email);
    }

  }, [currentUser])

  useEffect(() => {
    if (currentGroup) {
      firebase.getCurrentMonthTransactions(currentGroup, currentTransactions, setCurrentTransactions)
      console.log(currentTransactions)
    }
  }, [currentGroup])


  state = {
    firebase: firebase,
    signedIn: signedIn,
    setSignedIn: setSignedIn,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    currentGroup: currentGroup,
    setCurrentGroup: setCurrentGroup,
    currentTransactions: currentTransactions,
    setCurrentTransactions, setCurrentTransactions
  }

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext);

export default useFirebase;
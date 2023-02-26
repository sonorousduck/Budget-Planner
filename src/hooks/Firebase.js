import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { createContext, useContext, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';
const FirebaseContext = createContext(null);

// Optionally import the services that you want to use
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, update, query, orderByChild, remove, orderByKey } from "firebase/database";
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
              Utilities: true,
              Gas: true,
              Entertainment: true,
              Phone: true,
              Insurance: true,
              Donations: true,
              Savings: true,
              Income: true,
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


    addTransaction: (amount, description, optionalDetails, expense, date, selectedCategories, activeGroup) => {
      const transactionUUID = uuidv4();
      let currentMonth = date.getMonth() + 1;

      set(ref(database, 'transactions/' + activeGroup + '/' + date.getFullYear() + '/' + currentMonth + '/' + transactionUUID), {
        amount: amount,
        date: date.getTime(),
        description: description,
        optionalDetails: optionalDetails,
        expense: expense,
        category: selectedCategories,
        uuid: transactionUUID,
        timestamp: new Date().getTime()
      });
    },

    addBudgetItem: (amount, description, optionalDetails, date, percentage, recurring, selectedCategories, activeGroup) => {
      const budgetUUID = uuidv4();
      let currentMonth = date.getMonth() + 1;

      set(ref(database, 'budget/' + activeGroup + '/' + date.getFullYear() + '/' + currentMonth + '/' + budgetUUID), {
        amount: amount,
        date: date.getTime(),
        description: description,
        optionalDetails: optionalDetails,
        category: selectedCategories,
        uuid: budgetUUID,
        isPercentage: percentage,
        isRecurring: recurring,
        timestamp: new Date().getTime()
      });

      if (recurring) {
        set(ref(database, 'budget/' + activeGroup + '/' + 'recurring/' + budgetUUID), {
          amount: amount,
          date: date.getTime(),
          description: description,
          optionalDetails: optionalDetails,
          category: selectedCategories,
          uuid: budgetUUID,
          isPercentage: percentage,
          isRecurring: recurring,
          timestamp: new Date().getTime()
        });
      }
    },

    
    updateBudget: (amount, description, optionalDetails, date, percentage, recurring, selectedCategories, activeGroup, uuid) => {
      // let incomingDate = new Date(date);
      let currentMonth = date.getMonth() + 1;
      let year = date.getFullYear();

      const budget = {
        amount: amount,
        date: date.getTime(),
        description: description,
        optionalDetails: optionalDetails,
        category: selectedCategories,
        isPercentage: percentage,
        isRecurring: recurring,
      }

      update(ref(database, 'budget/' + activeGroup + '/' + year + '/' + currentMonth + '/' + uuid), budget)
    },

    addIncome: (amount, date) => {
      const incomeUUID = uuidv4();
      set(ref(database, 'transactions/' + activeGroup + '/income/' + date.getYear() + '/' + date.getMonth() + 1 + '/' + incomeUUID), {
        amount: amount,
        date: date.getTime(),
        uuid: incomeUUID
      });
    },

    getActiveGroup: (currentUser, setCurrentGroup) => {
      let email = currentUser.email;
      email = email.substring(0, email.indexOf('.'));
      const activeGroupRef = query(ref(database, "users/" + email + "/" + 'currentGroup'))
      onValue(activeGroupRef, (snapshot) => {
        snapshot.forEach((child) => {
          if (child.key == 'default') {
            setCurrentGroup(email);
          } else {
            setCurrentGroup(child.key)
          }
        })
      })
    },

    getAllGroups: (currentUser, setGroups) => {

      let email = currentUser.email;
      email = email.substring(0, email.indexOf('.'));
      const allGroupsRef = query(ref(database, `users/${email}/groups`))
      let groups = []
      onValue(allGroupsRef, (snapshot) => {
        snapshot.forEach((child) => {
          if (child.key == "default") {
            groups.push(email.substring(0, email.indexOf("@")));
          } else {
            groups.push(child.key);
          }
        })
        setGroups(groups);
      })
    },

    getCurrentBudgetAllocations: (activeGroup, setCurrentBudgets, currentUser) => {
      if (activeGroup) {
        let email = activeGroup;

        if (activeGroup == "default") {
          email = currentUser.email;
        }

        let date = new Date();
      
        let currentMonth = date.getMonth() + 1;
        if (email.includes('.')) {
          email = email.substring(0, email.indexOf('.'));
        }
        console.log("email from month budgets: ", email)

        const budgetRef = query(ref(database, 'budget/' + email + '/' + date.getFullYear() + '/' + currentMonth), orderByChild('timestamp'));
        onValue(budgetRef, (snapshot) => {
          const dataArray = [];
          snapshot.forEach((child) => {
            dataArray.unshift(child.val())
          })
          setCurrentBudgets(dataArray);
        });
      }
    },


    getCurrentMonthTransactions: (activeGroup, currentTransactions, setCurrentTransactions, currentUser) => {
      if (activeGroup) {
        let email = activeGroup;

        if (activeGroup == "default") {
          email = currentUser.email
        }
        let date = new Date();
        let currentMonth = date.getMonth() + 1;
        if (email.includes('.')) {
          email = email.substring(0, email.indexOf('.'));
        }
        console.log("email from month transactions: ", email)

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

    updateTransaction: (email, description, expense, amount, date, optionalDetails, selectedCategories, uuid) => {
      // email = email.substring(0, email.indexOf('.'));
      let incomingDate = new Date(date);
      let currentMonth = incomingDate.getMonth() + 1;
      let year = incomingDate.getFullYear();

      const transaction = {
        description: description,
        amount: amount,
        expense: expense,
        date: date,
        optionalDetails: optionalDetails,
        category: selectedCategories,
        uuid: uuid
      }

      update(ref(database, 'transactions/' + email + '/' + year + '/' + currentMonth + '/' + uuid), transaction)
    },


    getName: (email, setName) => {
      email = email.substring(0, email.indexOf('.'));

      const nameRef = ref(database, `/users/${email}`);
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        setName(data.name);
      })
    },

    setActiveGroup: (currentUser, newGroup, setCurrentGroup) => {
      let email = currentUser.email;
      email = email.substring(0, email.indexOf('.'));

      const groupUpdate = {
        currentGroup: {
          [newGroup]: true
        }
      }

      update(ref(database, `users/${email}`), groupUpdate)
      setCurrentGroup(newGroup);
    },

    getCategories: (currentUser, currentGroup, setCategories) => {
      const email = currentUser.email.substring(0, currentUser.email.indexOf('.'));
      const username = currentUser.email.substring(0, currentUser.email.indexOf('@'));

      if (currentGroup == "default" || currentGroup == email || currentGroup == username || currentGroup == currentUser.email) {
        if (currentGroup == currentUser.email) {
          currentGroup = currentGroup.substring(0, currentGroup.indexOf('@'));
        }

        const categoriesRef = query(ref(database, `/users/${email}/categories`), orderByKey());
        onValue(categoriesRef, (snapshot) => {
          const data = snapshot.val();
          setCategories(Object.keys(data));
          console.log(Object.keys(data))
        })
        return;
      }

      const categoriesRef = ref(database, `/groups/${currentGroup}/categories`);
      onValue(categoriesRef, (snapshot) => {
        const data = snapshot.val();
        setCategories(Object.keys(data));
        console.log(Object.keys(data))

      })

      return;
    },
  }
})()

export const FirebaseProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const [firebase] = useState(firebaseFunctions);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [currentBudgets, setCurrentBudgets] = useState([]);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
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
      firebase.getCurrentMonthTransactions(currentGroup, currentTransactions, setCurrentTransactions, currentUser)
      firebase.getCurrentBudgetAllocations(currentGroup, setCurrentBudgets, currentUser)
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
    setCurrentTransactions, setCurrentTransactions,
    currentBudgets: currentBudgets,
    setCurrentBudgets: setCurrentBudgets
  }

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext);

export default useFirebase;
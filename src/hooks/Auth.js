import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
let currentUser = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  console.log("SHOULD BE CALLED Yeet!")
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    currentUser = user;
    // ...
  } else {
    currentUser = undefined;
    // User is signed out
    // ...
  }
  console.log(currentUser)
});


export default currentUser;
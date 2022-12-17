import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const currentUser = auth.currentUser;
onAuthStateChanged(auth, (user) => {
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
});

export default currentUser;
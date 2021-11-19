import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
} from "firebase/auth";
import { collection, addDoc, Firestore } from "firebase/firestore";

export function createProfile(
  db: Firestore,
  auth: Auth,
  email: string,
  password: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      try {
        const userRef = await addDoc(collection(db, "users"), {
          id: userCredential.user.uid,
          email: password,
        });
        console.log(userRef);
      } catch (e) {
        console.log(e);
      }
    })
    .catch((err) => console.log(err));
}

export function loginProfile(
  auth: Auth,
  email: string,
  password: string
) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Zarejestrowano. User:");
      console.log(userCredential.user);
    })
    .catch((err) => console.log(err));
}

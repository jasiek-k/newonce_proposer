import {
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
} from "firebase/firestore";

import db from "../config/firebase";

const auth = getAuth();

export function createProfile(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
      });
    })
    .catch((err) => console.log(err));
}

export function createPlaylist(userId: string, name: string, password: string) {
  addDoc(collection(db, "users", userId, "playlists"), {
    name,
    password,
  });
}

export function signOutProfile() {
  signOut(auth).catch((err) => console.log(err));
}

export function addToPlaylist(
  userId: string,
  playlistId: string,
  trackData: {
    name: string;
    artist: string;
    votesYes?: number;
    votesNo?: number;
  }
) {
  addDoc(
    collection(db, "users", userId, "playlists", playlistId, "tracks"),
    trackData
  );
}

export function getCurrentUser() {
  if (!auth) return null;
  const user = auth.currentUser;

  if (!user) return null;

  return auth.currentUser;
}

export async function getUserPlaylists(userId: string) {
  const playlistsQuery = query(collection(db, "users", userId, "playlists"));

  const playlistsCollection = await getDocs(playlistsQuery);
  return playlistsCollection;
}

export async function getPlaylistTracks(userId: string, playlistId: string) {
  const tracksQuery = query(
    collection(db, "users", userId, "playlists", playlistId, "tracks")
  );

  const tracksArray = await getDocs(tracksQuery);
  return tracksArray;
}

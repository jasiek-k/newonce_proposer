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
  onSnapshot,
} from "firebase/firestore";
import { last } from "lodash";

import db from "../config/firebase";

import { TracksToPlaylistDTO } from "../modules/generator/Generator.types";

const auth = getAuth();

export function createPlaylist(
  userId: string,
  name: string,
  password: string,
  tracks: Array<TracksToPlaylistDTO>
) {
  
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

export function reactionsListener(userId: string, playlistId: string, updateReactions: (val: string) => void) {
  //TODO: pass playlsit id
  const listener = onSnapshot(doc(db, "users", userId, "playlists", 'yh8HjpFR7zsQs1yI92Yc'), (doc) => {
    console.log(doc.data()?.reactions)
    if(
      doc.data()?.reactions
    ) {
      updateReactions?.(last(doc.data()?.reactions || ['dupa']) as string)
    }
  });
  return listener;
}
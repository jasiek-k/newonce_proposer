import { atom } from "recoil";

export const userPlaylistsState = atom<{name: string; id: string}[]>({
  key: 'userPlaylists',
  default: []
})
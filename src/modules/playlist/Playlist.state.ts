import { atom } from "recoil";
import { TracksToPlaylistDTO } from "../generator/Generator.types";

export const playlistState = atom<{
  name: string;
  tracks: TracksToPlaylistDTO[],
} | null>({
  key: 'playlistState',
  default: null,
})

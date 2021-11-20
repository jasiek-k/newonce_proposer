import { atom } from "recoil";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
// import { recoilPersist } from "recoil-persist";
// to do usunac
// const { persistAtom } = recoilPersist();

export const playlistState = atom<{
  name: string;
  tracks: TracksToPlaylistDTO[];
  reactions: string[];
} | null>({
  key: "playlistState",
  default: null,
  // effects_UNSTABLE: [persistAtom],
});

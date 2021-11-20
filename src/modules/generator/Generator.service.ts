import ApiService from "../../ApiService";
import { TracksToPlaylistDTO } from "./Generator.types";

export const fetchMostRatedAlbums = async () => {
  const albums = await ApiService.get<Album[]>('releases/most_rated')
  return albums;
}

export const generateSpotifyPlaylist = async (data: {
  name: string;
  tracks: TracksToPlaylistDTO[],
}) => {
  
}
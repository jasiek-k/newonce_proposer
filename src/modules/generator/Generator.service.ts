import ApiService from "../../ApiService";
import { Album } from "../../types/Album";

export const fetchMostRatedAlbums = async () => {
  const albums = await ApiService.get<Album[]>('releases/most_rated')
  return albums;
}

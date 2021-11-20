import { useState, FormEvent } from "react";
import { useRecoilState } from "recoil";
import ApiService from "../../ApiService";
import SpotifyApiService from "../../SpotifyIntegration/SpotifyApi.service";
import Button from "../commons/Button.component";
import SearchResult from "../commons/SearchResults.component";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import { formatSearchString } from "./Playlist.page";
import { playlistState } from "./Playlist.state";

const AddToPlaylist = () => {
  const [artist, setartist] = useState<string>("");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<{
    [key: string]: AlbumDetails;
  }>({});

  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(playlistState);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artistData = await (
      await ApiService.get<{ items: { slug: string }[] }>(
        `/artists?search_query=${artist}&page=1&per_page=5`
      )
    ).data;
    console.log(artistData);
    const artistAlbums = await (
      await ApiService.get<ArtistAlbums>(
        `/artists/${artistData.items[0].slug}/releases`
      )
    ).data;
    setAlbums(artistAlbums.popular);
  };

  const getTracks = async (albumSlug: string) => {
    console.log("aa", albumSlug);
    const albumTracks = (
      await ApiService.get<AlbumDetails>(`releases/${albumSlug}`)
    ).data;
    setTracks({
      ...tracks,
      [albumSlug]: albumTracks,
    });
  };

  const addTrackToPlaylist = async (track: TracksToPlaylistDTO) => {
    setCurrentPlaylist((curr) =>
      curr ? { ...curr, tracks: [...curr.tracks, track] } : curr
    );
    // TODO: add if user is playlist owner
    // const trackUri = (
    //   await SpotifyApiService.getTrack(formatSearchString(track))
    // ).tracks.items[0].uri;
    // console.log(trackUri);
    // const playlists = await SpotifyApiService.getPlaylists();
    // const playlist = playlists?.items.find(
    //   (playlist) => playlist.name === currentPlaylist?.name
    // );

    // if (playlist) {
    //   await SpotifyApiService.addToTrackToPlaylis(playlist.id, [trackUri]);
    // }
  };
  const closeSearch = () => setAlbums([]);

  console.log(tracks);

  return (
    <div>
      <h1 className="my-30 text-24 font-primary font-black uppercase">
        Wyszukaj artyste:
      </h1>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          id="search-artist"
          placeholder="np. Kizo"
          className="border-2 font-secondary text-gray text-14 pl-16 py-12 mb-20"
          value={artist}
          onChange={(e) => setartist(e.target.value)}
        />
        <Button type="submit" caption="szukaj" />
      </form>
      {!!albums.length && (
        <div className="mt-30 p-12 border-2">
          <div className="flex flex-row justify-end">
            <button
              type="button"
              className="font-secondary font-bold text-12 mb-12"
              onClick={closeSearch}
            >
              ZAMKNIJ
            </button>
          </div>
          <div style={{ height: "600px" }} className="overflow-auto">
            {albums.map((album) => (
              <SearchResult
                album={album}
                tracks={tracks}
                getTracks={getTracks}
                addTrackToPlaylist={addTrackToPlaylist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylist;

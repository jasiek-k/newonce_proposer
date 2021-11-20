import { useState, FormEvent } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ApiService from "../../ApiService";
import SpotifyApiService from "../../SpotifyIntegration/SpotifyApi.service";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import { formatSearchString } from "./Playlist.page";
import { playlistState } from "./Playlist.state";

const AddToPlaylist = () => {
  const [artist, setartist] = useState<string>("");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<{
    [key: string]: AlbumDetails
  }>({});

  const [currentPlaylist ,setCurrentPlaylist] = useRecoilState(playlistState);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artistData = await (await ApiService.get<{items: { slug: string}[]}>(`/artists?search_query=${artist}&page=1&per_page=5`)).data
    console.log(artistData);
    const artistAlbums = await (await ApiService.get<ArtistAlbums>(`/artists/${artistData.items[0].slug}/releases`)).data
    setAlbums(artistAlbums.popular)
  };

  const getTracks = async (albumSlug: string) => {
    console.log('aa', albumSlug);
    const albumTracks = (await ApiService.get<AlbumDetails>(`releases/${albumSlug}`)).data
    setTracks({
      ...tracks,
      [albumSlug]: albumTracks,
    })
  }

  const addTrackToPlaylist = async (track: TracksToPlaylistDTO) => {
    const trackUri =  (await SpotifyApiService.getTrack(formatSearchString(track))).tracks.items[0].uri;
    console.log(trackUri);
    setCurrentPlaylist((curr) => curr ? ({...curr, tracks: [...curr.tracks, track]}) : curr)
    const playlists = await SpotifyApiService.getPlaylists();
    const playlist = playlists?.items.find((playlist) => playlist.name === currentPlaylist?.name)

    if(playlist) {
      await SpotifyApiService.addToTrackToPlaylis(playlist.id, [trackUri])
    }
  }

console.log(tracks);
  return (
    <div>
        <form onSubmit={handleLogin}>
          <label htmlFor="search-artist">Artysta:</label>
          <input
            id="search-artist"
            required
            value={artist}
            onChange={(e) => setartist(e.target.value)}
          />

          <button type="submit">Wyszukaj artyste</button>
      </form>
      {albums.map((album) => (
        <div onClick={() => getTracks(album.slug)}>
            <img className="object-contain h-48" src={album.image.url} alt="trackImage" />
            <span>{album.name}</span>
            {tracks[album.slug] && tracks[album.slug].tracklist.map((track) => (
            <ul onClick={() => addTrackToPlaylist({
              name: track.title,
              duration: track.duration,
              album: album.name,
              artist: album.artist_name,
              imgSrc: album.image.url
            })}>
              <li>
                {track.title}
              </li>
            </ul>
          ))
          }
        </div>
      ))}
    </div>
  )
}

export default AddToPlaylist;
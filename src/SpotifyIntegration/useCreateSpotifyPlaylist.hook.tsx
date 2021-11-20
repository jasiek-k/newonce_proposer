import { useEffect, useState } from "react";
import SpotifyApiService from "./SpotifyApi.service";
import SpotifyPlayer from "react-spotify-web-playback";

const useCreateSpotifyPlaylist = (
  tracksFind?: string[],
  playlistName?: string
) => {
  const [currentPlaylistUri, setCurrentPlaylistUri] = useState<
    string | undefined
  >();

  useEffect(() => {
    const init = async () => {
      if (tracksFind && playlistName) {
        const playlists = await SpotifyApiService.getPlaylists();
        await SpotifyApiService.getUserId();
        const result = await Promise.all(
          tracksFind.map((trackFind) => SpotifyApiService.getTrack(trackFind))
        );
        let playlist = playlists?.items.find(
          (playlist) => playlist.name === playlistName
        );
        if (!playlist) {
          const playlistData = await SpotifyApiService.createPlaylist(
            playlistName
          );
          playlist = playlistData;
        }
        const uris = result
          .map((track) => track.tracks.items?.[0]?.uri)
          .filter((track) => !!track);
        if (playlist) {
          await SpotifyApiService.addToTrackToPlaylis(playlist.id, uris);
        }
        setCurrentPlaylistUri(playlist?.uri);
      }
    };
    init();
  }, [playlistName, tracksFind]);

  if (!currentPlaylistUri) {
    return <div></div>;
  }

  return (
    <SpotifyPlayer
      token={SpotifyApiService.WEB_PLAYBACK_TOKEN}
      uris={[currentPlaylistUri]}
    />
  );
};

export default useCreateSpotifyPlaylist;

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SpotifyApiService from "./SpotifyApi.service";
import { userPlaylistsState} from './SpotifyIntegration.state';
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyExamplePlayer = () => {

  const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState)

  const [currentPlaylistUri, setCurrentPlaylistUri] = useState<string | undefined>()

  useEffect(() => {
    const init = async () => {
      const playlists = await SpotifyApiService.getPlaylists();
      await SpotifyApiService.getUserId();
      const result = await SpotifyApiService.getTrack('Papierosy, Reto');
      let playlist = playlists?.items.find((playlist) => playlist.name === 'test')
      console.log(playlist, playlists);
      if(!playlist) {
        const playlistData = await SpotifyApiService.createPlaylist("test");
        playlist = playlistData;
      }
      const uris = result.tracks.items.map((item) => item.uri);
      if (playlist){
        await SpotifyApiService.addToTrackToPlaylis(playlist.id, uris);
      }
      setCurrentPlaylistUri(playlist?.uri);
    }
    init();
  }, [])

  if(!currentPlaylistUri) {
    return null;
  }

  return <SpotifyPlayer
    token={SpotifyApiService.WEB_PLAYBACK_TOKEN}
    uris={[currentPlaylistUri]}
/>;
}

export default SpotifyExamplePlayer;
import React from "react";
import { useRecoilValue } from "recoil";
import useCreateSpotifyPlaylist from "../../SpotifyIntegration/useCreateSpotifyPlaylist.hook";
import Header from "../commons/Header.component";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import { playlistState } from "./Playlist.state";

const formatSearchString = (track: TracksToPlaylistDTO) => `${track.name}, ${track.album}, ${track.artist}`;

const Playlist: React.FC = () => {
  // TODO: fetching from database
  const currentPlaylist = useRecoilValue(playlistState);

  // TODO: validate password, or mayby if limited time let's not implement that feature?

  const Player = useCreateSpotifyPlaylist(currentPlaylist?.tracks.map((track) => formatSearchString(track)), currentPlaylist?.name)
  

  if(!currentPlaylist) {
    return (
      <div>
        <Header />
        loading
      </div>
    )
  }

  return(
      <div>
      <Header />
      <div>
        {currentPlaylist.name}
      </div>
      <div>
      TWOJE UTWORY
      <ul>
        {currentPlaylist.tracks.map((track) => (
          <li>
            <div>
            <img className="object-contain h-48" src={track.imgSrc} alt="trackImage" />
            <span>{track.name} - {track.artist} - {track.duration}</span>
            </div>
          </li>
        ))}
      </ul>
      </div>
      {Player && <Player />}
    </div>
  );
}


export default Playlist;

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyApiService from "../../SpotifyIntegration/SpotifyApi.service";
import useCreateSpotifyPlaylist from "../../SpotifyIntegration/useCreateSpotifyPlaylist.hook";
import Header from "../commons/Header.component";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import AddToPlaylist from "./AddToPlaylist.component";
import { playlistState } from "./Playlist.state";

export const formatSearchString = (track: TracksToPlaylistDTO) =>
  `${track.name}, ${track.album}, ${track.artist}`;

const Playlist: React.FC = () => {
  // TODO: fetching from database
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(playlistState);

  // TODO: validate password, or mayby if limited time let's not implement that feature?

  const Player = useCreateSpotifyPlaylist(
    currentPlaylist?.tracks.map((track) => formatSearchString(track)),
    currentPlaylist?.name
  );

  const activateTrack = async (track: TracksToPlaylistDTO) => {
    // TODO call to api
    setCurrentPlaylist((curr) =>
      curr
        ? {
            ...curr,
            tracks: curr.tracks.map((ltrack) =>
              ltrack.name === track.name
                ? {
                    ...ltrack,
                    isActive: true,
                  }
                : ltrack
            ),
          }
        : curr
    );

    const trackUri = (
      await SpotifyApiService.getTrack(formatSearchString(track))
    ).tracks.items[0].uri;
    console.log(trackUri);
    const playlists = await SpotifyApiService.getPlaylists();
    const playlist = playlists?.items.find(
      (playlist) => playlist.name === currentPlaylist?.name
    );

    if (playlist) {
      await SpotifyApiService.addToTrackToPlaylis(playlist.id, [trackUri]);
    }
  };

  const removeTrack = (track: TracksToPlaylistDTO) => {
    setCurrentPlaylist((curr) =>
      curr
        ? {
            ...curr,
            tracks: curr.tracks.filter((ltrack) => ltrack.name !== track.name),
          }
        : curr
    );
  };

  if (!currentPlaylist) {
    return (
      <div>
        <Header />
        loading
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>{currentPlaylist.name}</div>
      <div>
        TWOJE UTWORY
        <ul>
          {currentPlaylist.tracks.map((track) => (
            <li>
              <div className={track.isActive ? "bg-green-400" : "bg-gray-400"}>
                {!track.isActive && (
                  <>
                    <button onClick={() => activateTrack(track)}>
                      Add to playlist
                    </button>
                    <button onClick={() => removeTrack(track)}>Remove</button>
                  </>
                )}

                <img
                  className="object-contain h-48"
                  src={track.imgSrc}
                  alt="trackImage"
                />
                <span>
                  {track.name} - {track.artist} - {track.duration}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <AddToPlaylist />
      </div>
      {Player && <Player />}
    </div>
  );
};

export default Playlist;

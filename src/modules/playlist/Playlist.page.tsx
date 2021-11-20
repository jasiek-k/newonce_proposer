import { orderBy, partition } from "lodash";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyApiService from "../../SpotifyIntegration/SpotifyApi.service";
import useCreateSpotifyPlaylist from "../../SpotifyIntegration/useCreateSpotifyPlaylist.hook";
import Header from "../commons/Header.component";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import AddToPlaylist from "./AddToPlaylist.component";
import { playlistState } from "./Playlist.state";
import useFloatingReactions from "./useFloatingReactions.hook";

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

  const addReaction = (reaction: string) => {
    setCurrentPlaylist((curr) =>
      curr
        ? {
            ...curr,
            reactions: [...curr.reactions, reaction],
          }
        : curr
    );
  };

  const upvoteTrack = (track: TracksToPlaylistDTO) => {
    setCurrentPlaylist((curr) =>
      curr
        ? {
            ...curr,
            tracks: curr.tracks.map((ltrack) =>
              ltrack.name === track.name
                ? {
                    ...ltrack,
                    votes: ltrack.votes + 1,
                  }
                : ltrack
            ),
          }
        : curr
    );
  };

  useFloatingReactions(currentPlaylist?.reactions);

  if (!currentPlaylist) {
    return (
      <div>
        <Header />
        loading
      </div>
    );
  }

  const [activeSongs, awaitngSongs] = partition(
    currentPlaylist.tracks,
    "isActive"
  );

  return (
    <div>
      <Header />
      <div>{currentPlaylist.name}</div>
      <div>
        TWOJE UTWORY
        <ul>
          {activeSongs.map((track) => (
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
        <ul>
          Oczekujące
          {orderBy(awaitngSongs, "votes", "desc").map((track) => (
            <li>
              <div>
                {
                  //ADD if user playlist host
                }
                <>
                  <button onClick={() => activateTrack(track)}>
                    Add to playlist
                  </button>
                  <button onClick={() => removeTrack(track)}>Remove</button>
                </>

                {
                  //ADD if user not playlist host
                }
                <>
                  <button onClick={() => upvoteTrack(track)}>+1</button>
                </>

                <img
                  className="object-contain h-48"
                  src={track.imgSrc}
                  alt="trackImage"
                />
                <span>
                  {track.name} - {track.artist} - {track.duration} -{" "}
                  {track.votes}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <>
          Rections
          <button onClick={() => addReaction("fire")}>🔥</button>
          <button onClick={() => addReaction("party")}>🥳</button>
          <button onClick={() => addReaction("thumbdown")}>👎</button>
        </>
      </div>
      <div>
        <AddToPlaylist />
      </div>
      {Player && <Player />}
    </div>
  );
};

export default Playlist;

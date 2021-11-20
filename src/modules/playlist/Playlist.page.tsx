import { orderBy, partition } from "lodash";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyApiService from "../../SpotifyIntegration/SpotifyApi.service";
import useCreateSpotifyPlaylist from "../../SpotifyIntegration/useCreateSpotifyPlaylist.hook";
import Banner from "../commons/Banner.component";
import Container from "../commons/Container.component";
import Header from "../commons/Header.component";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import AddToPlaylist from "./AddToPlaylist.component";
import { playlistState } from "./Playlist.state";
import useFloatingReactions from "./useFloatingReactions.hook";
import TrackItem from "./TrackItem.component";
import ListButton from "../commons/ListButton.component";
import { doc, getDoc } from "@firebase/firestore";
import { useHistory } from "react-router";
import db from "../../config/firebase";

export const formatSearchString = (track: TracksToPlaylistDTO) =>
  `${track.name}, ${track.album}, ${track.artist}`;

const Playlist: React.FC = () => {
  // TODO: fetching from database
  const history = useHistory();
  const params = history.location.search.split("/");
  const userId = params[0].substring(1);
  const playlistId = params[1];

  getDoc(doc(db, "users", userId, "playlists", playlistId)).then((res) => {
    if (res.exists()) {
      console.log(res.data())
      // setCurrentPlaylist(
      //   res.data() as {
      //     name: string;
      //     tracks: TracksToPlaylistDTO[];
      //     reactions: string[];
      //   }
      // );
    }
  });

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
      <div style={{ height: "100vh" }} className="w-full flex flex-col">
        <Header />
        <div className="w-full flex-1 flex flex-row items-center justify-center">
          <h1 className="text-26 font-black font-primary text-center">
            Generujemy Twoją playlistę.
            <br />
            Może to chwilę potrwać…
          </h1>
        </div>
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
      <Banner>
        <h1 className="text-38 font-primary font-black uppercase">
          {currentPlaylist.name}
        </h1>
      </Banner>
      <Container className="flex flex-row mb-80">
        <div style={{ width: "66.66%" }} className="flex flex-col pr-12">
          <h1 className="my-30 text-24 font-primary font-black">
            TWOJE UTWORY
          </h1>
          <ul>
            {currentPlaylist.tracks.map((track, index) => (
              <TrackItem
                track={track}
                key={index}
                activateTrack={activateTrack}
                removeTrack={removeTrack}
                className="mb-20"
              />
            ))}
          </ul>
          <ul>
            <h1 className="my-30 text-24 font-primary uppercase font-black">
              Oczekujące
            </h1>

            {orderBy(awaitngSongs, "votes", "desc").map((track, index) => (
              <TrackItem
                track={track}
                key={index}
                activateTrack={activateTrack}
                removeTrack={removeTrack}
                upvoteTrack={upvoteTrack}
                className="mb-20"
              />

              // <li>
              //   <div>
              //     {
              //       //ADD if user playlist host
              //     }
              //     <>
              //       <button onClick={() => activateTrack(track)}>
              //         Add to playlist
              //       </button>
              //       <button onClick={() => removeTrack(track)}>Remove</button>
              //     </>

              //     {
              //       //ADD if user not playlist host
              //     }
              //     <>
              //       <button onClick={() => upvoteTrack(track)}>+1</button>
              //     </>

              //     <img
              //       className="object-contain h-48"
              //       src={track.imgSrc}
              //       alt="trackImage"
              //     />
              //     <span>
              //       {track.name} - {track.artist} - {track.duration} -{" "}
              //       {track.votes}
              //     </span>
              //   </div>
              // </li>
            ))}
          </ul>
        </div>

        <div style={{ width: "33.33%" }} className="flex flex-col pl-12">
          <div className="p-12 border-2 mt-30">
            <h1 className="mb-12 text-24 font-primary uppercase font-black">
              HOW YOU FEEL?
            </h1>
            <div className="flex flex-row"></div>
            <ListButton
              type="button"
              className="mr-12 "
              buttonClass="p-10"
              onClick={() => addReaction("fire")}
            >
              <div className="w-24 h-24">🔥</div>
            </ListButton>

            <ListButton
              type="button"
              className="mr-12 "
              buttonClass="p-10"
              onClick={() => addReaction("party")}
            >
              <div className="w-24 h-24"> 🥳</div>
            </ListButton>
            <ListButton
              type="button"
              className="mr-12 "
              buttonClass="p-10"
              onClick={() => addReaction("thumbdown")}
            >
              <div className="w-24 h-24"> 👎</div>
            </ListButton>
          </div>
          <AddToPlaylist />
        </div>
      </Container>
      {Player && <Player />}
    </div>
  );
};

export default Playlist;

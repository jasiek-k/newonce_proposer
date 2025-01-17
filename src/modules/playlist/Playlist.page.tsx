import { last, orderBy, partition, values } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyApiService from "../../SpotifyIntegration/SpotifyApi.service";
import useCreateSpotifyPlaylist from "../../SpotifyIntegration/useCreateSpotifyPlaylist.hook";
import { reactionsListener } from "../../utils/firestore";
import Banner from "../commons/Banner.component";
import Container from "../commons/Container.component";
import Header from "../commons/Header.component";
import { TracksToPlaylistDTO } from "../generator/Generator.types";
import { userState } from "../login/Login.state";
import AddToPlaylist from "./AddToPlaylist.component";
import { playlistState } from "./Playlist.state";
import useFloatingReactions from "./useFloatingReactions.hook";
import TrackItem from "./TrackItem.component";
import ListButton from "../commons/ListButton.component";
import { doc, collection, getDoc, query, getDocs } from "@firebase/firestore";
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

  const firebasePlaylistData = {
    name: "",
    password: "",
    tracks: [],
  };

  useEffect(() => {
    getDoc(doc(db, "users", userId, "playlists", playlistId)).then((res) => {
      const playlistName = res.data();

      firebasePlaylistData.name = playlistName?.name;
      firebasePlaylistData.password = playlistName?.password;
    });

    const tracksQuery = query(
      collection(db, "users", userId, "playlists", playlistId, "tracks")
    );

    getDocs(tracksQuery).then((res) => {
      const resa = res.docs.map((doc) => doc.data());
      console.log(resa);
      setCurrentPlaylist(
        (curr) =>
          ({
            ...curr,
            name: firebasePlaylistData.name,
            password: firebasePlaylistData.password,
            tracks: resa.map((val) => ({ ...val, reactions: [] })),
          } as any)
      );
    });
  }, []);

  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(playlistState);
  const user = useRecoilValue(userState);
  console.log(user);

  // TODO: validate password, or mayby if limited time let's not implement that feature?

  const Player = useCreateSpotifyPlaylist(
    currentPlaylist?.tracks.map((track) => formatSearchString(track)),
    currentPlaylist?.name
  );

  const addReaction = useCallback(
    (reaction: string) => {
      setCurrentPlaylist((curr) =>
        curr
          ? {
              ...curr,
              reactions: [...(curr.reactions || []), reaction],
            }
          : curr
      );
    },
    [setCurrentPlaylist]
  );

  useEffect(() => {
    let listener: any;
    if (currentPlaylist?.name) {
      listener = reactionsListener(user.uid, currentPlaylist.name, addReaction);
    }
    return listener;
  }, [addReaction, currentPlaylist?.name, user.uid]);

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
  console.log({ currentPlaylist });

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
            {activeSongs.map((track, index) => (
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
            {
              !!awaitngSongs.length ? (
                orderBy(awaitngSongs, "votes", "desc").map((track, index) => (
                  <TrackItem
                    track={track}
                    key={index}
                    activateTrack={activateTrack}
                    removeTrack={removeTrack}
                    upvoteTrack={upvoteTrack}
                    className="mb-20"
                  />
                ))
              ) : (
                <span className="text-14 font-secondary text-gray">
                  Obecnie nie masz żadnych oczekujących traczków.
                  <br />
                  Dodaj je korzystając z szukajki po prawej stronie.
                </span>
              )

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
            }
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
      {Player}
    </div>
  );
};

export default Playlist;

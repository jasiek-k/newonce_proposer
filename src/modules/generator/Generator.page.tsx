import { sampleSize, shuffle } from "lodash";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { collection } from "@firebase/firestore";
import { addDoc } from "@firebase/firestore";
import ApiService from "../../ApiService";
import Banner from "../commons/Banner.component";
import Container from "../commons/Container.component";
import Header from "../commons/Header.component";
import { fetchMostRatedAlbums } from "./Generator.service";
import { TracksToPlaylistDTO } from "./Generator.types";
import GeneratorForm from "./GeneratorForm.component";
import { playlistState } from "../playlist/Playlist.state";
import { useHistory } from "react-router-dom";
import { PLAYLIST_ROUTE } from "../../config/config";
import { userState } from "../login/Login.state";
import db from "../../config/firebase";

const loadingScreen = (caption: any) => (
  <div style={{ height: "100vh" }} className="w-full flex flex-col">
    <Header />
    <div className="w-full flex-1 flex flex-row items-center justify-center">
      <h1 className="text-26 font-black font-primary text-center">{caption}</h1>
    </div>
  </div>
);

const Generator: React.FC = () => {
  const { data, error, isError, isLoading } = useQuery(
    "albums",
    fetchMostRatedAlbums
  );
  const history = useHistory();
  const [isGenerating, setIsGenerating] = useState(false);
  const setPlaylist = useSetRecoilState(playlistState);

  const user = useRecoilValue(userState);

  if (isLoading) {
    return loadingScreen("Loading... loading... loading...");
  }

  if (isError) {
    return loadingScreen("Ups... Coś się popsuło i nie było mnie słychać...");
  }

  if (isGenerating) {
    return loadingScreen(
      `Wyłaniamy zwycięzce bitwy freestyle'owej... Daj nam chwilę...`
    );
  }

  const generatePlaylist = async (data: {
    name: string;
    password: string;
    albumsIds: string[];
  }) => {
    setIsGenerating(true);
    // Ok this is not good practice but i am tired
    const albumsData = (
      await Promise.all(
        data.albumsIds.map((id) =>
          ApiService.get<AlbumDetails[]>(`releases/${id}`)
        )
      )
    ).map((reposnse) => reposnse.data) as unknown as AlbumDetails[];
    const playlistToCreate: {
      name: string;
      tracks: TracksToPlaylistDTO[];
      reactions: string[];
    } = {
      name: data.name,
      reactions: [],
      tracks: shuffle(
        albumsData.flatMap((album) =>
          sampleSize(album.tracklist, 2).map((track) => ({
            artist: album.artist_name,
            album: album.name,
            imgSrc: album.image.url,
            name: track.title,
            duration: track.duration,
            isActive: true,
            votes: 999999, // XD
          }))
        )
      ),
    };
    // TODO: save in db and generate some id and url
    setPlaylist(playlistToCreate);

    addDoc(collection(db, "users", user.uid, "playlists"), {
      name: data.name,
      password: data.password,
    }).then((res) => {
      playlistToCreate.tracks.forEach((track) => {
        addDoc(
          collection(db, "users", user.uid, "playlists", res.id, "tracks"),
          track
        );
      });
      setIsGenerating(false);
      history.replace({
        pathname: PLAYLIST_ROUTE,
        search: `${user.uid}/${res.id}`,
      });
    });
  };

  return (
    <div>
      <Header />
      <Banner />
      <Container>
        <GeneratorForm albums={data?.data || []} onSubmit={generatePlaylist} />
      </Container>
    </div>
  );
};

export default Generator;

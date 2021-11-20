import { sampleSize } from "lodash";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
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

const Generator: React.FC = () => {
  const { data, error, isError, isLoading } = useQuery(
    "albums",
    fetchMostRatedAlbums
  );
  const history = useHistory();
  const [isGenerating, setIsGenerating] = useState(false);
  const setPlaylist = useSetRecoilState(playlistState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {(error as any)?.message}</div>;
  }

  if (isGenerating) {
    return <div>Generating ...</div>;
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
    } = {
      name: data.name,
      tracks: albumsData.flatMap((album) =>
        sampleSize(album.tracklist, 2).map((track) => ({
          artist: album.artist_name,
          album: album.name,
          imgSrc: album.image.url,
          name: track.title,
          duration: track.duration,
        }))
      ),
    };
    // TODO: save in db and generate some id and url
    setPlaylist(playlistToCreate);
    setIsGenerating(false);
    // TODO: add id to url
    history.replace(PLAYLIST_ROUTE);
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

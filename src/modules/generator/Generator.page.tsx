import React from "react";
import { useQuery } from "react-query";
import Header from "../commons/Header.component";
import { fetchMostRatedAlbums } from "./Generator.service";
import GeneratorForm from "./GeneratorForm.component";

const Generator: React.FC = () => {

  const { data, error, isError, isLoading } = useQuery("albums", fetchMostRatedAlbums);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {(error as any)?.message}</div>;
  }

  const generatePlaylist = (data: {
    name: string;
    password: string;
    albumsIds: string[];
  }) =>  {};

  return (
    <div>
      <Header />
      <GeneratorForm albums={data?.data|| []} onSubmit={generatePlaylist} />
    </div>
  );
};

export default Generator;

import React, { useEffect, useState } from "react";
import Container from "../commons/Container.component";
import Banner from "../commons/Banner.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";
import { useRecoilValue } from "recoil";
import { userState } from "../login/Login.state";
import {
  GENERATOR_ROUTE,
  HOME_ROUTE,
  PLAYLIST_ROUTE,
} from "../../config/config";
import { useHistory } from "react-router-dom";
import { getUserPlaylists } from "../../utils/firestore";

const Profile: React.FC = () => {
  const { push } = useHistory();

  const user = useRecoilValue(userState);
  // TODO: add id
  const [playlist, setUserLocalPlaylists] = useState<
    { name: string; id: string }[]
  >([]);

  const handleCreatePlaylist = () => {
    push(GENERATOR_ROUTE);
  };

  console.log(user, "user");

  useEffect(() => {
    if (!user) {
      push(HOME_ROUTE);
    }
  }, [push, user]);

  useEffect(() => {
    const init = async () => {
      if (user) {
        const data = await getUserPlaylists(user?.uid);
        setUserLocalPlaylists(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as {
            name: string;
            id: string;
          }[]
        );
      }
    };
    init();
  }, [user, user?.uid]);

  return (
    <div>
      <Header />
      <Banner />
      <Container>
        {user && (
          <div className="w-full mb-30">
            <div style={{ width: "66.66%" }} className="flex flex-col mx-auto">
              <h2 className="font-primary text-18 text-gray font-black py-30">
                {user.email}
              </h2>
              <div className="flex flex-row items-center justify-between mb-30">
                <h1 className="uppercase font-primary text-38 font-black">
                  Twoje playlisty
                </h1>
                <Button
                  style={{ width: "37.5%" }}
                  caption="utwórz nową"
                  onClick={handleCreatePlaylist}
                />
              </div>
              {!playlist.length ? (
                <h2 className="my-80 font-primary text-22 font-black">
                  Jeszcze niczego z nami nie słuchałeś :C
                  <br />
                  Utwórz swoją pierwszą playliste
                </h2>
              ) : (
                <>
                  {playlist.map((playlist, index) => (
                    <a
                      // to do - check
                      href={`${PLAYLIST_ROUTE}?${user.uid}/${playlist.id}`}
                      key={index}
                      className="p-16 border-2 mb-20"
                    >
                      {console.log(playlist)}
                      <h1 className="font-primary text-24 font-black">
                        {playlist.name}
                      </h1>
                    </a>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;

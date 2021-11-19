import React, { useState } from "react";
import Container from "../commons/Container.component";
import Banner from "../commons/Banner.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";

const user = {
  name: "John Doe",
  email: "johndoe@gmail.com",
};

const Profile: React.FC = () => {
  const [playlists, setPlaylists] = useState([
    { title: "asdasd", time: "1h 15min", timestamp: "12.1.2020" },
  ]);

  return (
    <div>
      <Header />
      <Banner>
        <h1 className="text-32 mb-4 font-primary font-black">
          PLAYLIST PROPOSER
        </h1>
        <h2 className="text-16 font-primary font-black">
          Nie masz pomysłu co puścić? Zajmiemy się tym za Ciebie
        </h2>
      </Banner>

      <Container>
        <div className="flex flex-row pt-50">
          <div className="w-1/3">
            <h2 className="font-primary text-32 font-black">{user.name}</h2>
            <span className="font-primary text-18">{user.email}</span>
          </div>
          <div className="w-2/3">
            <Button caption="utwórz nową" />
            {playlists.length ? (
              <div>
                {playlists.map((item, index) => (
                  <div key={index}>
                    <div>{item.title}</div>
                    <div>{item.time}</div>
                    <div>{item.timestamp}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>FAŁSZ</div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;

import React from "react";

interface IProps {
  album: any;
  tracks: any;
  getTracks: any;
  addTrackToPlaylist: any;
}

const SearchResult: React.FC<IProps> = ({
  album,
  tracks,
  getTracks,
  addTrackToPlaylist,
}) => (
  <div className="mb-6">
    <div
      onClick={() => getTracks(album.slug)}
      style={{ paddingBottom: "100%" }}
      className="relative wrapper w-full overflow-hidden"
    >
      <img
        className="absolute min-w-full min-h-full h-48"
        src={album.image.url}
        alt={`Album ${album.name} cover`}
      />
      <div
        style={{ opacity: "30%" }}
        className="w-full h-full mask absolute top-0 left-0 bg-black"
      />
      <div className="absolute top-0 w-full flex flex-row items-center justify-between left-0 p-16 font-secondary text-12 font-black text-white">
        <span>{album.name}</span>
      </div>
    </div>

    <ul className="my-6">
      {tracks[album.slug] &&
        tracks[album.slug].tracklist.map((track: any, index: any) => (
          <li key={index}>
            <button
              type="button"
              onClick={() =>
                addTrackToPlaylist({
                  name: track.title,
                  duration: track.duration,
                  album: album.name,
                  artist: album.artist_name,
                  imgSrc: album.image.url,
                  isActive: false,
                  votes: 0,
                })
              }
            >
              <span className="text-12 font-secondary">{track.title}</span>
            </button>
          </li>
        ))}
    </ul>
  </div>
);

export default SearchResult;

import clsx from "clsx";
import React from "react";
import ListButton from "../commons/ListButton.component";
import PlusIcon from "../commons/PlusIcon.component";

interface IProps {
  track: any;
  className?: string;
  activateTrack: any;
  removeTrack: any;
}

const TrackItem: React.FC<IProps> = ({
  track,
  className,
  activateTrack,
  removeTrack,
}) => (
  <li className={clsx(className, "w-full flex flex-row border-2")}>
    <div className="w-full flex flex-row">
      <div className="w-50">
        <div
          style={{ paddingBottom: "100%" }}
          className="relative overflow-hidden"
        >
          <img
            className="absolute w-full h-full"
            src={track.imgSrc}
            alt="trackImage"
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-row flex-1 border-l-2 items-center",
          track.isActive ? "bg-green" : "bg-gray"
        )}
      >
        <div className="px-16 w-full flex-row flex items-center justify-between font-secondary">
          <div style={{ width: "80%" }} className="flex flex-row">
            <span style={{ width: "50%" }} className="font-bold">
              {track.name}
            </span>
            <span style={{ width: "50%" }}>{track.artist}</span>
          </div>
          {track.isActive ? (
            <div
              style={{ width: "20%" }}
              className="flex flex-row justify-end "
            >
              <span>{track.duration}</span>
            </div>
          ) : (
            <div style={{ zIndex: 9 }}>
              <ListButton
                type="button"
                className="mr-12 "
                onClick={() => activateTrack(track)}
              >
                <PlusIcon stroke="#000" />
              </ListButton>
              <ListButton
                type="button"
                buttonClass="bg-red"
                onClick={() => removeTrack(track)}
              >
                <PlusIcon
                  style={{ transform: "rotate(45deg)" }}
                  stroke="#000"
                />
              </ListButton>
            </div>
          )}
        </div>
      </div>
    </div>
  </li>
);

export default TrackItem;

{
  /* <div>{currentPlaylist.name}</div>
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
</div> */
}

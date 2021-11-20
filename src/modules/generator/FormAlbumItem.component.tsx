import clsx from "clsx";
import React from "react";
import PlusIcon from "../commons/PlusIcon.component";

interface IProps {
  album: Album;
  handleChange: any;
  className?: string;
}

const FormAlbumItem: React.FC<IProps> = ({
  album,
  handleChange,
  className,
}) => (
  <div
    style={{ width: "25%" }}
    className={clsx("flex flex-row mb-24", className)}
  >
    <input
      onChange={handleChange}
      type="checkbox"
      name="albumsIds"
      className="hidden custom-checkbox"
      value={album.slug}
      id={`${album.id}_${album.slug}`}
    />
    <label
      htmlFor={`${album.id}_${album.slug}`}
      className="flex flex-row w-full checkbox-label"
    >
      <div
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
          <PlusIcon stroke="#fff" />
        </div>
      </div>
    </label>
  </div>
);

export default FormAlbumItem;

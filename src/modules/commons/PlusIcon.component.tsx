import React from "react";

interface IProps {
  stroke: string;
  style?: any;
}

const PlusIcon: React.FC<IProps> = ({ stroke, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    style={style}
  >
    <path
      d="M12,8v8m4-4H8"
      transform="translate(-7 -7)"
      fill="none"
      stroke={stroke} // "#fff"
      strokeLinecap="square"
      strokeWidth="2"
    />
  </svg>
);

export default PlusIcon;

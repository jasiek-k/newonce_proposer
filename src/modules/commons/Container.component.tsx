import clsx from "clsx";
import React from "react";

interface IProps {
  className?: string;
}

const Container: React.FC<IProps> = ({ children, className }) => (
  <div
    className={clsx(
      "w-full mx-0 lg:px-40 mid:px-0 mid:max-w-1128 mid:mx-auto",
      className
    )}
  >
    {children}
  </div>
);

export default Container;

import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  onClick?: () => void;
  caption: string;
}

const Button: React.FC<IProps> = ({
  onClick,
  className,
  children,
  disabled,
  type = "button",
  caption,
  ...props
}) => (
  <button className={className} onClick={onClick} type={type} {...props}>
    <div
      className={clsx(
        "py-16 bg-blue border-2 relative flex flex-row items-center w-full justify-center",
        { "opacity-30": disabled }
      )}
    >
      <span className="uppercase text-12 text-white font-secondary font-black">
        {caption}
      </span>
      <div
        style={{ height: "calc(100% + 4px)", width: "calc(100% + 4px)" }}
        className="bg-black absolute w-full h-full top-0 -right-4 -z-1"
      />
    </div>
  </button>
);

export default Button;

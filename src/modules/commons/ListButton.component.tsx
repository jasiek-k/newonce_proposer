import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  onClick?: () => void;
  buttonClass?: string;
}
const ListButton: React.FC<IProps> = ({
  onClick,
  className,
  children,
  disabled,
  buttonClass,
  type = "button",
  ...props
}) => (
  <button className={className} onClick={onClick} type={type} {...props}>
    <div
      className={clsx(
        buttonClass,
        "p-10 border-2 bg-white relative flex flex-row items-center w-full justify-center",
        { "opacity-30": disabled }
      )}
    >
      {children}
      <div
        style={{ height: "calc(100% + 4px)", width: "calc(100% + 4px)" }}
        className="bg-black absolute w-full h-full top-0 -right-4 -z-1"
      />
    </div>
  </button>
);

export default ListButton;

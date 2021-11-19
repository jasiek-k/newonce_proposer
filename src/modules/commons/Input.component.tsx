import React from "react";
import { Field } from "formik";
import clsx from "clsx";

interface IProps {
  className?: string;
  placeholder: string;
  name: string;
  type?: string;
}

const Input: React.FC<IProps> = ({
  className,
  placeholder,
  name,
  type = "text",
}) => (
  <Field
    className={clsx(
      className,
      "border-2 font-secondary text-gray text-14 pl-16 py-12"
    )}
    placeholder={placeholder}
    name={name}
    type={type}
  />
);

export default Input;

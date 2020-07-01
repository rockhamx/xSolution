import React from "react";

interface Props {
  className: string;
  value: string;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => any;
}
export default function Button(props: Props) {
  const { value, onClick } = props;
  const className = ["btn", "btn-primary", ...props.className.split(" ")].join(
    " "
  );

  return (
    <input
      type="button"
      className={className}
      value={value}
      onClick={onClick}
    />
  );
}

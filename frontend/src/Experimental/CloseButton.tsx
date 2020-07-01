import React from "react";

interface Props {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
}
export function CloseButton(props: Props) {
  const { onClick } = props;
  const className = ["btn-close", ...props.className.split(" ")].join(" ");

  return (
    <button type="button" className={className} onClick={onClick}>
      x
    </button>
  );
}

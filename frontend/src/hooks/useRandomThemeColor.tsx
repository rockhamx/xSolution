import { BACKGROUNDCOLORS, BORDERCOLORS } from "../utils/CONSTANT";
import { useEffect, useState, CSSProperties } from "react";

export default function useRandomThemeColor() {
  const [style, setStyle] = useState({
    "--primary-color": "",
    "--hover-color": "",
  } as CSSProperties);

  useEffect(() => {
    const randomColorIndex = Math.floor(
      Math.random() * BACKGROUNDCOLORS.length
    );
    const primaryColor = BACKGROUNDCOLORS[randomColorIndex];
    const hoverColor = BORDERCOLORS[randomColorIndex];

    setStyle({
      "--primary-color": primaryColor,
      "--hover-color": hoverColor,
    } as CSSProperties);
  }, []);

  return style;
}

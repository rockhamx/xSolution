import { useRef } from "react";

const useCounter = (startFrom: number = 0) => {
  const counter = useRef(startFrom);

  return counter;
};

export default useCounter;

import { useEffect } from "react";

export const useEventListener = (
  eventTarget: HTMLElement | Document | Window,
  type: string,
  listener: EventListenerOrEventListenerObject,
  option: AddEventListenerOptions | boolean = false
) => {
  useEffect(() => {
    const isSupported = eventTarget && eventTarget.addEventListener;
    if (!isSupported) return;

    eventTarget.addEventListener(type, listener, option);

    return () => {
      eventTarget.removeEventListener(type, listener, option);
    };
  }, [eventTarget, type, listener, option]);
};

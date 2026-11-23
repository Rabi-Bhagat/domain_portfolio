import { useEffect, useRef } from "react";

let activeModals = 0;

export default function useModalHistory(onClose) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    activeModals += 1;
    window.history.pushState({ __portfolioModal: true }, "");

    const handlePop = () => {
      activeModals = Math.max(0, activeModals - 1);
      onCloseRef.current?.();
    };

    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
      activeModals = Math.max(0, activeModals - 1);

      if (activeModals === 0) {
        const delay = import.meta.env.DEV ? 350 : 0;

        window.setTimeout(() => {
          if (activeModals === 0 && window.history.state?.__portfolioModal) {
            window.history.back();
          }
        }, delay);
      }
    };
  }, []);
}

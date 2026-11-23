import { useEffect, useState } from "react";

export default function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(ids[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY + offset;
      let current = ids[0] || "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= position) {
          current = id;
        }
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids, offset]);

  return active;
}

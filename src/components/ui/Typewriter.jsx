import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function Typewriter({
  words = [],
  className = "",
  typingSpeed = 65,
  deletingSpeed = 32,
  pause = 1500,
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = words[index % Math.max(words.length, 1)] || "";

  useEffect(() => {
    if (reduce || words.length === 0) return;

    let delay = deleting ? deletingSpeed : typingSpeed;

    if (!deleting && length === current.length) {
      delay = pause;
    }

    if (deleting && length === 0) {
      delay = 220;
    }

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (length < current.length) {
          setLength((value) => value + 1);
        } else {
          setDeleting(true);
        }
      } else if (length > 0) {
        setLength((value) => value - 1);
      } else {
        setDeleting(false);
        setIndex((value) => (value + 1) % words.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, length, current, words.length, typingSpeed, deletingSpeed, pause, reduce]);

  if (reduce) {
    return <span className={className}>{words[0] || ""}</span>;
  }

  return (
    <span className={className} aria-live="polite">
      {current.slice(0, length)}
      <span className="caret-blink ml-0.5 inline-block text-primary" aria-hidden="true">
        |
      </span>
    </span>
  );
}

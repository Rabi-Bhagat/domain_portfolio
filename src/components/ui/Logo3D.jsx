import { useState } from "react";

const sizes = {
  sm: { box: "h-8 w-8 rounded-lg", img: "h-4 w-4" },
  md: { box: "h-10 w-10 rounded-lg", img: "h-5 w-5" },
  lg: { box: "h-11 w-11 rounded-xl", img: "h-6 w-6" },
};

export default function Logo3D({
  src,
  alt = "Logo",
  size = "md",
  className = "",
  href,
  target = "_blank",
  rel = "noopener noreferrer",
}) {
  const [failed, setFailed] = useState(false);
  const preset = sizes[size] || sizes.md;

  const content = (
    <span
      className={`inline-flex items-center justify-center border border-line bg-canvas ${preset.box} ${className}`}
    >
      {failed ? (
        <span className="text-[10px] font-semibold text-muted">
          {alt.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`object-contain ${preset.img}`}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={alt}
        title={alt}
        className="inline-flex focus-ring rounded-lg"
      >
        {content}
      </a>
    );
  }

  return content;
}

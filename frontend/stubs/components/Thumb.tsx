import * as React from "react";

type Props = {
  url?: string;        // archive.tsx passes entry.url
  mime?: string;       // archive.tsx passes entry.type
  className?: string;  // archive.tsx passes className
};

const Thumb: React.FC<Props> = ({ url, mime, className }) => {
  // Render nothing if no URL (keeps demo resilient)
  if (!url) return <div className={className} />;

  // Very simple preview; real site can switch by mime
  return <img src={url} alt={mime ?? "preview"} className={className} />;
};

export default Thumb;

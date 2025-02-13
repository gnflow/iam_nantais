import * as React from "react";
import { VideoHeroProps } from "./types";

export const VideoHero: React.FC<VideoHeroProps> = ({ videoSrc, heading }) => {
  return (
    <section
      className="flex overflow-hidden relative justify-center items-center w-screen h-screen"
      aria-label="Hero section"
    >
      <video
        src={videoSrc}
        className="object-cover absolute top-0 left-0 size-full z-[-1]"
        autoPlay={false}
        loop
        muted
        aria-hidden="true"
      />
      <h1 className="relative text-5xl text-[white]">{heading}</h1>
    </section>
  );
};

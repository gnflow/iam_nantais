import * as React from "react";
import { Symbol } from "./Symbol";
import { VideoHero } from "./VideoHero";

export default function HeroSection() {
  return (
    <main>
      <Symbol
        className="box-border flex relative flex-col shrink-0"
        symbol={{
          data: {},
        }}
      />
      <VideoHero
        videoSrc="https://cdn.builder.io/o/assets%2Fbe27d83bd55643398f14f77216f92d90%2F8c8f4ef649c04736a82b7ec25636fc30%2Fcompressed?apiKey=be27d83bd55643398f14f77216f92d90&token=8c8f4ef649c04736a82b7ec25636fc30&alt=media&optimized=true"
        heading="Welcome to Our Site"
      />
    </main>
  );
};

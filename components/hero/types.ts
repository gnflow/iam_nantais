export interface VideoHeroProps {
  videoSrc: string;
  heading: string;
}

export interface SymbolProps {
  className?: string;
  symbol: {
    data: Record<string, unknown>;
  };
}

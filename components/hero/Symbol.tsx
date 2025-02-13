import * as React from "react";
import { SymbolProps } from "./types";

export const Symbol: React.FC<SymbolProps> = ({ className, symbol }) => {
  return (
    <div className={className} role="presentation">
      {symbol.data && Object.keys(symbol.data).length > 0 && (
        <div aria-hidden="true" />
      )}
    </div>
  );
};

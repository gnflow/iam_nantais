'use client'
import React, { useState } from "react";
import NavigationHeader from "./NavigationHeader";
import PrimaryNavigation from "./PrimaryNavigation";

export default function NavigationHeaderContainer() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative text-black">
      <NavigationHeader onMenuToggle={handleMenuToggle} />
      <PrimaryNavigation isOpen={menuOpen} />
    </div>
  );
};

// export default NavigationHeaderContainer;

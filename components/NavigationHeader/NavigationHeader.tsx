// components/NavigationHeader/NavigationHeader.tsx
import React from "react";

import {Bars4Icon}  from "@heroicons/react/24/outline"; // heroicons.d.ts to make it works as v1 or v2

interface NavigationHeaderProps {
  onMenuToggle: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onMenuToggle,
}) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="w-full max-w-6xl mx-auto flex items-center justify-between p-4">
          <a href="/" className="text-xl font-semibold" aria-label="Home">
            I'm Nantais
          </a>
        <button
          onClick={onMenuToggle}
          aria-controls="primary-navigation"
          aria-expanded="false"
          className="block md:hidden"
        >
          <Bars4Icon className="h-6 w-6" />
     
        </button>
        <ul
          className="hidden md:flex space-x-4"
          aria-label="Primary Navigation"
          id="primary-navigation"
        >
          <li>
              <a href="/about" className="hover:underline">About</a>
          </li>
          <li>
              <a href="/services" className="hover:underline">Services</a>
          </li>
          <li>
              <a href="/contact" className="hover:underline">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;

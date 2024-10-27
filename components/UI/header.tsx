// app/components/Header.js
"use client"; // Important pour utiliser les hooks d'état

import { useState } from "react";
import Image from "next/image";
import HamburgerIcon from "@/components/UI/hamburger";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const closeMenu = () => {
      setIsOpen(false);
    };
  
    return (
      <header className="relative bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">I AM NANTAIS</h1>
          {/* Hamburger icon visible only on mobile/tablet */}
          <div className="md:hidden">
            <HamburgerIcon onClick={toggleMenu} />
          </div>
        </div>
        {/* Mobile Navigation */}
        <nav
          className={`absolute top-0 left-0 w-full bg-white transition-transform transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } md:hidden`}
        >
          <div className="flex justify-between p-4">
            {/* Close Button */}
            <button onClick={closeMenu} className="text-xl">
              &times; {/* Symbol "X" for closing */}
            </button>
          </div>
          <ul className="flex flex-col items-center p-4">
            <li className="my-2">
              <a href="#presentation" className="uppercase hover:text-red-500" onClick={closeMenu}>
                Présentation
              </a>
            </li>
            <li className="my-2">
              <a href="#emission" className="uppercase hover:text-red-500" onClick={closeMenu}>
                Notre émission
              </a>
            </li>
            <li className="my-2">
              <a href="#artistes" className="uppercase hover:text-red-500" onClick={closeMenu}>
                Artistes Nantais/es
              </a>
            </li>
            <li className="my-2">
              <a href="#events" className="uppercase hover:text-red-500" onClick={closeMenu}>
                Events/réservation
              </a>
            </li>
          </ul>
        </nav>
        {/* Desktop Navigation - Only visible on large screens */}
        <nav className="hidden md:flex md:justify-center md:items-center">
          <ul className="flex space-x-8">
            <li>
              <a href="#presentation" className="uppercase hover:text-red-500">
                Présentation
              </a>
            </li>
            <li>
              <a href="#emission" className="uppercase hover:text-red-500">
                Notre émission
              </a>
            </li>
            <li>
              <a href="#artistes" className="uppercase hover:text-red-500">
                Artistes Nantais/es
              </a>
            </li>
            <li>
              <a href="#events" className="uppercase hover:text-red-500">
                Events/réservation
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
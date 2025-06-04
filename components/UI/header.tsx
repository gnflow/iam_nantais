"use client"; // Important pour utiliser les hooks d'état

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import HamburgerIcon from "@/components/UI/hamburger";
import Link from "next/link";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="relative w-full bg-white shadow-md p-4 text-black">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">I'M NANTAIS</Link>
        
        {/* Desktop Navigation - Only visible on large screens */}
        <nav className="hidden lg:flex md:justify-center md:items-center">
          <ul className="flex space-x-8">
            <li><a href="/presentation" className="uppercase hover:text-red-500">Présentation</a></li>
            <li><a href="/events" className="uppercase hover:text-red-500">Events</a></li>
            <li><a href="/emission" className="uppercase hover:text-red-500">Notre émission</a></li>
            <li><a href="/artistes" className="uppercase hover:text-red-500">Artistes</a></li>
            
          </ul>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="p-2 hover:text-red-500" onClick={toggleSearch}>
            <Search size={20} />
          </button>
          <Link href="/signup" className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition">
            Sign Up
          </Link>
          <Link href="/signin" className="px-4 py-2 bg-black text-white rounded-md hover:opacity-80 transition">
            Sign In
          </Link>
        </div>
        
        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
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
          <button onClick={closeMenu} className="text-xl">&times;</button>
        </div>
        <ul className="flex flex-col items-center p-4 space-y-4">
          <Link href="/" className="text-lg font-bold">I'M NANTAIS</Link>
          <li><a href="/presentation" className="uppercase hover:text-red-500" onClick={closeMenu}>Présentation</a></li>
          <li><a href="/events" className="uppercase hover:text-red-500" onClick={closeMenu}>Events</a></li>
          <li><a href="/emission" className="uppercase hover:text-red-500" onClick={closeMenu}>Notre émission</a></li>
          <li><a href="/artistes" className="uppercase hover:text-red-500" onClick={closeMenu}>Artistes</a></li>
          
          {/* Mobile Actions */}
          <div className="flex flex-col items-center space-y-2 mt-4">
            <button className="p-2 hover:text-red-500" onClick={toggleSearch}>
              <Search size={24} />
            </button>
            <Link href="/signup" className="px-6 py-2 border border-black rounded-md hover:bg-black hover:text-white transition">
              Sign Up
            </Link>
            <Link href="/signin" className="px-6 py-2 bg-black text-white rounded-md hover:opacity-80 transition">
              Sign In
            </Link>
          </div>
        </ul>
      </nav>
      
      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Recherche</h2>
              <button onClick={toggleSearch} className="text-xl">&times;</button>
            </div>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Rechercher..." />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

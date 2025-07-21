"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import HamburgerIcon from "@/components/UI/hamburger";
import Link from "next/link";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="relative w-full bg-white shadow-md p-4 text-black z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          I'M NANTAIS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:justify-center lg:items-center">
          <ul className="flex space-x-8">
            <li><Link href="/presentation" className="uppercase hover:text-red-500">Présentation</Link></li>
            <li><Link href="/events" className="uppercase hover:text-red-500">Events</Link></li>
            <li><Link href="/emission" className="uppercase hover:text-red-500">Notre émission</Link></li>
            <li><Link href="/artistes" className="uppercase hover:text-red-500">Artistes</Link></li>
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

        {/* Hamburger Icon (mobile/tablet only) */}
        <div className={`lg:hidden z-50 ${isOpen ? "hidden" : "block"}`}>
          <HamburgerIcon onClick={toggleMenu} />
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Drawer Navigation */}
      <nav
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">MENU</span>
          <button onClick={closeMenu} className="text-2xl font-bold">&times;</button>
        </div>

        <ul className="flex flex-col p-6 space-y-6 text-black">
          <li>
            <Link href="/" className="text-lg font-bold uppercase" onClick={closeMenu}>
              I'M NANTAIS
            </Link>
          </li>
          <li><Link href="/presentation" onClick={closeMenu} className="uppercase hover:text-red-500">Présentation</Link></li>
          <li><Link href="/events" onClick={closeMenu} className="uppercase hover:text-red-500">Events</Link></li>
          <li><Link href="/emission" onClick={closeMenu} className="uppercase hover:text-red-500">Notre émission</Link></li>
          <li><Link href="/artistes" onClick={closeMenu} className="uppercase hover:text-red-500">Artistes</Link></li>

          {/* Mobile Actions */}
          <div className="mt-8 flex flex-col space-y-4">
            <button className="p-2 hover:text-red-500" onClick={toggleSearch}>
              <Search size={24} />
            </button>
            <Link href="/signup" className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition">
              Sign Up
            </Link>
            <Link href="/signin" className="px-4 py-2 bg-black text-white rounded-md hover:opacity-80 transition">
              Sign In
            </Link>
          </div>
        </ul>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Recherche</h2>
              <button onClick={toggleSearch} className="text-xl">&times;</button>
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Rechercher..."
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

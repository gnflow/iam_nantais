import React from "react";
import Link from "next/link";

interface PrimaryNavigationProps {
  isOpen: boolean;
}

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({ isOpen }) => {
  return (
    <nav
      aria-label="Primary"
      className={`absolute top-0 right-0 w-full bg-white shadow-md ${
        isOpen ? "block" : "hidden"
      } md:hidden`}
    >
      <ul className="flex flex-col items-center space-y-4 p-4">
        <li>
          {/* <Link href="/about"> */}
            <a href="/about" className="hover:underline" tabIndex={isOpen ? 0 : -1}>
              About
            </a>
          {/* </Link> */}
        </li>
        <li>
          {/* <Link href="/services"> */}
            <a href="/services" className="hover:underline" tabIndex={isOpen ? 0 : -1}>
              Services
            </a>
          {/* </Link> */}
        </li>
        <li>
          {/* <Link href="/contact"> */}
            <a href="/contact" className="hover:underline" tabIndex={isOpen ? 0 : -1}>
              Contact
            </a>
          {/* </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default PrimaryNavigation;

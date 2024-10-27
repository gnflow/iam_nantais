// app/components/HamburgerIcon.tsx
import React from 'react';

interface HamburgerIconProps {
  onClick: () => void; // Le type pour onClick est une fonction qui ne prend pas d'arguments et ne retourne rien
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col justify-center items-center cursor-pointer">
      <div className="w-8 h-1 bg-black mb-1"></div>
      <div className="w-8 h-1 bg-black mb-1"></div>
      <div className="w-8 h-1 bg-black mb-1"></div>
    </div>
  );
};

export default HamburgerIcon;

import React from "react";

function Header({ logo }) {  // Accept logo as prop
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Deekshana Vastralaya Logo" className="h-10 mr-4" />
        <div className="text-2xl font-bold">Deekshana Vastralaya</div>
      </div>

      {/* Navigation */}
      <nav className="space-x-4">
      <button className="hover:underline bg-transparent text-white border-none cursor-pointer">
          Home
        </button>
        <button className="hover:underline bg-transparent text-white border-none cursor-pointer">
          Orders
        </button>
        <button className="hover:underline bg-transparent text-white border-none cursor-pointer">
          About
        </button>
        <button className="hover:underline bg-transparent text-white border-none cursor-pointer">
          Contact
        </button>
      </nav>
    </header>
  );
}

export default Header;

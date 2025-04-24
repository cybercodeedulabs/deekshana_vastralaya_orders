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
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Orders</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
      </nav>
    </header>
  );
}

export default Header;

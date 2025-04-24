import React from "react";

function Hero() {
  return (
    <main className="text-center py-20 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to Deekshana Vastralaya
      </h1>
      <p className="text-lg text-gray-700 mt-4">
        Discover a wide range of sarees and traditional wear.
      </p>
      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        Place Your Order
      </button>
    </main>
  );
}

export default Hero;

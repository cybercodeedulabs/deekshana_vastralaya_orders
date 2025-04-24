import React from "react";
import logo from './assets/logo.png';  // Ensure the correct path for logo
import Header from "./components/Header";  // Header component import
import Hero from "./components/Hero";  // Hero component import
import Footer from "./components/Footer";  // Footer component import
import OrderForm from "./components/OrderForm";  // Import OrderForm
import SearchOrders from "./components/SearchOrders";

function App() {
  return (
    <div>
      <Header logo={logo} />
      <Hero />
      <OrderForm />  {/* Include the OrderForm component */}
      <SearchOrders />
      <Footer />
    </div>
  );
}

export default App;

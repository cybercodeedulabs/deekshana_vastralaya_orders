import React, { useState } from "react";

const OrderForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    orderNumber: Math.floor(Math.random() * 1000000), // Auto-generate Order Number
    customerName: "",
    product: "",
    orderDate: "",
    quantity: "",
    customerAddress: "",
    vendor: "",
    actualPrice: "",
    sellPrice: "",
    orderStatus: "Pending", // Default value
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try {
      const response = await fetch("/.netlify/functions/submitOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data to backend
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order submitted successfully:", result);
        alert("Order submitted successfully!");

        // Reset the form
        setFormData({
          orderNumber: Math.floor(Math.random() * 1000000), // Generate a new order number
          customerName: "",
          product: "",
          orderDate: "",
          quantity: "",
          customerAddress: "",
          vendor: "",
          actualPrice: "",
          sellPrice: "",
          orderStatus: "Pending", // Reset to default value
        });
      } else {
        const errorData = await response.json();
        console.error("Error submitting order:", errorData);
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting the order.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Order Form</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="orderNumber"
          placeholder="Order Number"
          value={formData.orderNumber}
          readOnly
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="product"
          placeholder="Product"
          value={formData.product}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="orderDate"
          placeholder="Order Date"
          value={formData.orderDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="customerAddress"
          placeholder="Customer Address"
          value={formData.customerAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />

        <select
          name="vendor"
          placeholder="Vendor"
          value={formData.vendor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Vendor</option>
          <option value="Vendor1">Illampillai(Buvana)</option>
          <option value="Vendor2">VGR</option>
          <option value="Vendor2">VR Tex</option>
          <option value="Vendor2">Gowsalya Tex</option>
          <option value="Vendor2">GS Tex</option>
          <option value="Vendor2">Bhargavi Collections</option>
          <option value="Vendor2">Teja Vij</option>
        </select>

        <input
          type="number"
          name="actualPrice"
          placeholder="Actual Price"
          value={formData.actualPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="sellPrice"
          placeholder="Sell Price"
          value={formData.sellPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="orderStatus"
          placeholder="Order Status"
          value={formData.orderStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default OrderForm;

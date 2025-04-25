import React, { useState } from "react";

const SearchOrders = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `/.netlify/functions/searchOrders?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleEdit = (row) => {
    setEditRow(row.index);
    setEditData({
      orderNumber: row.row[0],
      customerName: row.row[1],
      product: row.row[2],
      orderDate: row.row[3],
      quantity: row.row[4],
      customerAddress: row.row[5],
      vendor: row.row[6],
      actualPrice: row.row[7],
      sellPrice: row.row[8],
      orderStatus: row.row[9],
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("/.netlify/functions/updateOrder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex: editRow, ...editData }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Order updated successfully!");
        setEditRow(null);
        setEditData({});
        handleSearch(); // Refresh results
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Search Orders</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter customer name"
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
      <div className="mt-4">
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index} className="border-b p-2">
                {result.row[1]} - {result.row[2]} - {result.row[9]}{" "}
                <button
                  onClick={() => handleEdit(result)}
                  className="ml-2 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {editRow && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Edit Order</h3>
          <input
            type="text"
            value={editData.customerName}
            onChange={(e) =>
              setEditData({ ...editData, customerName: e.target.value })
            }
            placeholder="Customer Name"
            className="border rounded p-2 w-full mb-2"
          />
          <input
            type="text"
            value={editData.product}
            onChange={(e) =>
              setEditData({ ...editData, product: e.target.value })
            }
            placeholder="Product"
            className="border rounded p-2 w-full mb-2"
          />
          <input
            type="text"
            value={editData.orderDate}
            onChange={(e) =>
              setEditData({ ...editData, orderDate: e.target.value })
            }
            placeholder="Order Date"
            className="border rounded p-2 w-full mb-2"
          />
          {/* Add inputs for other fields similarly */}
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Order
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchOrders;

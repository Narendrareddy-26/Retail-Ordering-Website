import React, { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  // Fetch inventory
  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8083/inventory");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Update stock
  const updateStock = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8083/inventory/update?productId=${productId}&quantity=${quantity}`
      );
      setMessage(res.data);
      fetchInventory();
    } catch (err) {
      setMessage("Error updating stock");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Inventory Management</h2>

      {/* Update Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Update Stock</h3>

        <input
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={updateStock}>Update</button>

        <p>{message}</p>
      </div>

      {/* Inventory List */}
      <div>
        <h3>Stock List</h3>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
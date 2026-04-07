import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/App.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.post(
        "http://localhost:8080/cart/remove",
        { productId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/orders/place",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      window.location.href = "/orderConfirmation?id=" + res.data.id;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId}>
            {item.productName || "Product"} - Quantity: {item.quantity}
            <button className="btn" onClick={() => removeItem(item.productId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button className="btn place-order" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;

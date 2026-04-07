import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-container">
      <h1>Order Confirmation</h1>
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.productName || "Product"} x {item.quantity} - $
            {item.price || 100}
          </li>
        ))}
      </ul>
      <p>Total: ${order.totalAmount}</p>
    </div>
  );
};

export default OrderConfirmation;

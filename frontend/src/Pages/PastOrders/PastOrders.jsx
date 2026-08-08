import React, { useContext, useEffect, useState } from "react";
import "./../MyOrders/MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const PastOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      const orders = response.data.data || [];
      setData(orders.filter((order) => order.status === "Delivered"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        fetchOrders();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", fetchOrders);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", fetchOrders);
    };
  }, [token]);

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <h2>Past Orders</h2>
        <Link to="/myorders" className="past-orders-link">Active Orders</Link>
      </div>
      <div className="container">
        {data.length === 0 ? (
          <p className="orders-empty">No past orders yet.</p>
        ) : (
          data.map((order, index) => (
            <div key={order._id || index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {(order.items || []).map((item, itemIndex) => {
                  if (itemIndex === (order.items || []).length - 1) {
                    return item.name + " x " + item.quantity;
                  }
                  return item.name + " x " + item.quantity + ", ";
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {(order.items || []).length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Refresh</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PastOrders;

import React, { useEffect } from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";

const Orders = ({ url, token, pastOnly = false }) => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list", { headers: { token } });
      if (response.data.success) {
        const allOrders = response.data.data || [];
        setOrders(
          pastOnly
            ? allOrders.filter((order) => order.status === "Delivered")
            : allOrders.filter((order) => order.status !== "Delivered")
        );
      } else {
        toast.error(response.data.message || "error");
      }
    } catch (error) {
      toast.error("error");
    }
  };
  const statusHandler = async (event,orderId) => {
    const newStatus = event.target.value;
    if (pastOnly && newStatus !== "Delivered") {
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } else if (!pastOnly && newStatus === "Delivered") {
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Order moved to Past Orders");
    } else {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:newStatus
    }, { headers: { token } })
    if(response.data.success){
      if (!( !pastOnly && newStatus === "Delivered")) {
        toast.success("Status updated")
      }
    } else {
      toast.error(response.data.message || "error")
      await fetchAllOrders();
    }
  }
  const deleteHandler = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    const response = await axios.post(
      url + "/api/order/delete",
      { orderId },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } else {
      toast.error(response.data.message || "error");
    }
  }
  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 5000);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        fetchAllOrders();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", fetchAllOrders);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", fetchAllOrders);
    };
  }, [location.pathname, token, pastOnly]);

  return (
    <div className="order add">
      <h3>{pastOnly ? "Past Orders" : "Orders"}</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>{pastOnly ? "No past orders yet." : "No active orders."}</p>
        ) : (
          orders.map((order, index) => (
            <div key={order._id || index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {(order.items || []).map((item, itemIndex) => {
                    if (itemIndex === (order.items || []).length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName+" "+order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items:{(order.items || []).length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button className="order-delete-btn" onClick={() => deleteHandler(order._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Orders;

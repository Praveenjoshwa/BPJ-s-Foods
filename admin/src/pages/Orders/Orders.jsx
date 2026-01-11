import React, { useState, useEffect, useCallback } from 'react';
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState(null);

  const statusConfig = {
    "Order Processing": { icon: "📋", color: "#3b82f6", bg: "#eff6ff" },
    "Packing": { icon: "📦", color: "#f59e0b", bg: "#fffbeb" },
    "Out for Delivery": { icon: "🚚", color: "#8b5cf6", bg: "#f5f3ff" },
    "Delivered": { icon: "✅", color: "#10b981", bg: "#ecfdf5" }
  };

  const statusList = Object.keys(statusConfig);

  const fetchAllOrders = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const response = await axios.get(url + "/api/order/list?t=" + Date.now());
      if (response.data.success) {
        setOrders(response.data.data);
        setLastSync(new Date());
      } else if (!silent) {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      if (!silent) toast.error("Connection error");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const updateOrderStatus = async (orderId, newStatus) => {
    // Optimistic update
    setOrders(prev => prev.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    ));

    try {
      const response = await axios.post(url + "/api/order/status", { orderId, status: newStatus });
      if (response.data.success && response.data.order) {
        // Use server response to ensure consistency
        setOrders(prev => prev.map(order =>
          order._id === orderId ? response.data.order : order
        ));
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update");
        fetchAllOrders();
      }
    } catch (error) {
      toast.error("Update failed");
      fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(() => fetchAllOrders(true), 8000);
    return () => clearInterval(interval);
  }, [fetchAllOrders]);

  // Calculate stats
  const stats = statusList.reduce((acc, status) => {
    acc[status] = orders.filter(o => o.status === status).length;
    return acc;
  }, {});

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order.address?.firstName + " " + order.address?.lastName)
      .toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "All" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className='orders-container'>
      {/* Premium Header */}
      <div className="orders-header">
        <div className="header-left">
          <h1>📋 Orders</h1>
          <span className="sync-badge">
            {lastSync ? `Synced ${lastSync.toLocaleTimeString()}` : 'Syncing...'}
          </span>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="🔍 Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={() => fetchAllOrders()} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statusList.map(status => (
          <div
            key={status}
            className={`stat-card ${activeTab === status ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === status ? "All" : status)}
            style={{
              '--accent-color': statusConfig[status].color,
              '--accent-bg': statusConfig[status].bg
            }}
          >
            <span className="stat-icon">{statusConfig[status].icon}</span>
            <div className="stat-info">
              <span className="stat-count">{stats[status]}</span>
              <span className="stat-label">{status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeTab === "All" ? 'active' : ''}`}
          onClick={() => setActiveTab("All")}
        >
          All ({orders.length})
        </button>
        {statusList.map(status => (
          <button
            key={status}
            className={`filter-tab ${activeTab === status ? 'active' : ''}`}
            onClick={() => setActiveTab(status)}
            style={{ '--tab-color': statusConfig[status].color }}
          >
            {statusConfig[status].icon} {status} ({stats[status]})
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {isLoading && orders.length === 0 ? (
          <div className="loading-state">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">No orders found</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="order-id">
                  <span className="id-label">Order</span>
                  <span className="id-value">#{order._id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="order-meta">
                  <span className="order-date">{formatDate(order.date)}</span>
                  <span
                    className="status-badge"
                    style={{
                      color: statusConfig[order.status]?.color || '#666',
                      background: statusConfig[order.status]?.bg || '#f5f5f5'
                    }}
                  >
                    {statusConfig[order.status]?.icon} {order.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                {/* Customer Info */}
                <div className="customer-section">
                  <div className="customer-avatar">
                    {order.address?.firstName?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="customer-details">
                    <h3>{order.address?.firstName} {order.address?.lastName}</h3>
                    <p className="customer-phone">📞 {order.address?.phone}</p>
                    <p className="customer-address">
                      📍 {order.address?.street}, {order.address?.city}
                    </p>
                  </div>
                </div>

                {/* Items List */}
                <div className="items-section">
                  <h4>🛒 Items ({order.items?.length})</h4>
                  <div className="items-list">
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">×{item.quantity}</span>
                        <span className="item-price">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    {order.items?.length > 3 && (
                      <div className="more-items">+{order.items.length - 3} more items</div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="summary-section">
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span>{order.deliveryType || 'Standard'}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span className="total-amount">₹{order.amount}</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="status-timeline">
                {statusList.map((status, idx) => {
                  const currentIdx = statusList.indexOf(order.status);
                  const isCompleted = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div
                      key={status}
                      className={`timeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div
                        className="step-dot"
                        style={{
                          background: isCompleted ? statusConfig[status].color : '#e5e7eb',
                          boxShadow: isCurrent ? `0 0 0 4px ${statusConfig[status].bg}` : 'none'
                        }}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <span className="step-text">{status.replace('Order ', '')}</span>
                      {idx < statusList.length - 1 && (
                        <div
                          className="step-line"
                          style={{ background: idx < currentIdx ? statusConfig[statusList[idx + 1]].color : '#e5e7eb' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                {statusList.map(status => (
                  <button
                    key={status}
                    className={`action-btn ${order.status === status ? 'active' : ''}`}
                    onClick={() => updateOrderStatus(order._id, status)}
                    disabled={order.status === status}
                    style={{
                      '--btn-color': statusConfig[status].color,
                      '--btn-bg': statusConfig[status].bg
                    }}
                  >
                    {statusConfig[status].icon} {status.replace('Order ', '')}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

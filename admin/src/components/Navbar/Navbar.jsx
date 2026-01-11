import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = ({ url, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastCheckedTime, setLastCheckedTime] = useState(Date.now());
  const navigate = useNavigate();

  // Fetch new orders for notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const orders = response.data.data || [];
        // Get orders from last 24 hours that are pending/processing
        const recentOrders = orders.filter(order => {
          const orderTime = new Date(order.date).getTime();
          const now = Date.now();
          const isRecent = (now - orderTime) < 24 * 60 * 60 * 1000; // Last 24 hours
          const isPending = order.status === 'Food Processing' || order.status === 'Order Processing';
          return isRecent && isPending;
        });
        setNotifications(recentOrders.slice(0, 5)); // Show max 5
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for new orders every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [url]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/list?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = (orderId) => {
    setShowNotifications(false);
    navigate('/orders');
  };

  const clearNotifications = () => {
    setLastCheckedTime(Date.now());
    setShowNotifications(false);
  };

  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <span className="brand-name" onClick={() => navigate('/')}>Princi Maligai</span>
        <span className="brand-badge">Admin</span>
      </div>
      <div className="navbar-right">
        <form className="nav-search" onSubmit={handleSearch}>
          <span className="search-icon" onClick={handleSearch}>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button
            className="nav-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span>🔔</span>
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>New Orders</h4>
                {notifications.length > 0 && (
                  <span className="clear-btn" onClick={clearNotifications}>Clear</span>
                )}
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <span>✅</span>
                    <p>No new orders</p>
                  </div>
                ) : (
                  notifications.map((order, index) => (
                    <div
                      key={index}
                      className="notification-item"
                      onClick={() => handleNotificationClick(order._id)}
                    >
                      <div className="notification-icon">📦</div>
                      <div className="notification-content">
                        <p className="notification-title">New Order #{order._id.slice(-6)}</p>
                        <p className="notification-detail">
                          {order.items?.length || 0} items • ₹{order.amount}
                        </p>
                        <p className="notification-time">
                          {new Date(order.date).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <div className="notification-footer" onClick={() => { setShowNotifications(false); navigate('/orders'); }}>
                  View All Orders →
                </div>
              )}
            </div>
          )}
        </div>

        <div className="nav-profile" onClick={() => navigate('/profile')}>
          <img src={assets.profile_image} alt="Admin" className="profile" />
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Manager</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

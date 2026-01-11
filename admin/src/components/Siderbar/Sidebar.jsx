import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/add', icon: '➕', label: 'Add Product' },
    { path: '/list', icon: '📦', label: 'Products' },
    { path: '/orders', icon: '🛒', label: 'Orders' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="close-sidebar-btn" onClick={closeSidebar}>×</button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              <span className="active-indicator"></span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-item">
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-label">Settings</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

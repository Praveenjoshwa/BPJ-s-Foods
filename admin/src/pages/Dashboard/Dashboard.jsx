import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = ({ url }) => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        lowStockItems: 0,
        totalRevenue: 0
    })
    const [revenueData, setRevenueData] = useState([])
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchStats = async () => {
        setLoading(true)
        try {
            const [productRes, orderRes] = await Promise.all([
                axios.get(`${url}/api/product/list`),
                axios.get(`${url}/api/order/list`)
            ])

            const products = productRes.data.data || []
            const orders = orderRes.data.data || []

            // Calculate Stats
            const lowStock = products.filter(item => item.stock < 10).length
            const revenue = orders.reduce((acc, order) => acc + (order.payment ? order.amount : 0), 0)

            setStats({
                totalProducts: products.length,
                totalOrders: orders.length,
                lowStockItems: lowStock,
                totalRevenue: revenue
            })

            // Process Revenue Data (Last 7 days)
            const last7Days = [...Array(7)].map((_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toISOString().split('T')[0]
            }).reverse()

            const revData = last7Days.map(date => {
                const dailyOrders = orders.filter(order => order.date.startsWith(date) && order.payment)
                const dailyRevenue = dailyOrders.reduce((acc, order) => acc + order.amount, 0)
                return {
                    name: new Date(date).toLocaleDateString('en-IN', { weekday: 'short' }),
                    revenue: dailyRevenue
                }
            })
            setRevenueData(revData)

            // Get Recent Orders (Last 5)
            const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))
            setRecentOrders(sortedOrders.slice(0, 5))

        } catch (error) {
            console.error("Error fetching dashboard stats:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return (
        <div className='dashboard'>
            <div className="dashboard-header">
                <h1>Dashboard Overview</h1>
                <p className="dashboard-subtitle">Welcome back, Admin</p>
            </div>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <div className="card-info">
                        <h3>Total Products</h3>
                        <p className="card-value">{stats.totalProducts}</p>
                    </div>
                    <div className="card-icon products-icon">📦</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-info">
                        <h3>Total Orders</h3>
                        <p className="card-value">{stats.totalOrders}</p>
                    </div>
                    <div className="card-icon orders-icon">🛒</div>
                </div>
                <div className="dashboard-card clickable" onClick={() => navigate('/list?stock=low')}>
                    <div className="card-info">
                        <h3>Low Stock</h3>
                        <p className="card-value highlight">{stats.lowStockItems}</p>
                    </div>
                    <div className="card-icon stock-icon">⚠️</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-info">
                        <h3>Total Revenue</h3>
                        <p className="card-value">₹{stats.totalRevenue}</p>
                    </div>
                    <div className="card-icon revenue-icon">💰</div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-chart-section">
                    <h3>Weekly Sales Overview</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="var(--primary)"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-recent-orders">
                    <div className="section-header">
                        <h3>Recent Orders</h3>
                        <button className="view-all-btn" onClick={() => navigate('/orders')}>View All</button>
                    </div>
                    <div className="table-responsive">
                        <table className="recent-orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="empty-state">No recent orders found</td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order._id} onClick={() => navigate('/orders')}>
                                            <td className="order-id">#{order._id.slice(-6)}</td>
                                            <td>{order.items.length} items</td>
                                            <td className="order-amount">₹{order.amount}</td>
                                            <td>
                                                <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

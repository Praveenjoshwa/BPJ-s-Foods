import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Siderbar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader'

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  React.useEffect(() => {
    // Show loading screen for 3 seconds (video duration)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const url = import.meta.env.VITE_API_URL
    ? (import.meta.env.VITE_API_URL.startsWith('http') ? import.meta.env.VITE_API_URL : `https://${import.meta.env.VITE_API_URL}`)
    : "http://localhost:4000";

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-wrapper">
      <ToastContainer />
      <Navbar url={url} toggleSidebar={toggleSidebar} />
      <div className="app-content">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <Routes>
          <Route path='/' element={<Dashboard url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          <Route path='/profile' element={<Profile url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

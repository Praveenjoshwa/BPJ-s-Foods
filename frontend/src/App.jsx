import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/verify'
import MyOrder from './pages/MyOrders/MyOrder'
import { StoreContext } from './context/StoreContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Loader from './components/Loader/Loader'

const App = () => {
  const { showLogin, setShowLogin, loading } = useContext(StoreContext)

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      {showLogin ? <LoginPopup /> : <></>}
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrder />} />

        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App


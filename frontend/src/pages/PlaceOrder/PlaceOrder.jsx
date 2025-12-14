import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      alert(response.data.message); // Show actual error message
    }
  }
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className='Multi-fields'>
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email Address' />
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className='Multi-fields'>
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className='Multi-fields'>
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$2.00</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${(getTotalCartAmount() + 2).toFixed(2)}</p>
            </div>
          </div>
          <button type='submit' >Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

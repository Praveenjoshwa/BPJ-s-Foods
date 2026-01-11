import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const tamilNaduCities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Tiruppur",
  "Thanjavur"
];

const PlaceOrder = () => {
  const { getTotalCartAmount, token, product_list, cartItems, url } = useContext(StoreContext);
  const [deliveryType, setDeliveryType] = useState("Same Day");
  const deliveryFee = deliveryType === "Same Day" ? 40 : 25;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "Chennai",
    state: "Tamil Nadu",
    zipcode: "",
    country: "India",
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
    product_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee,
      deliveryType: deliveryType
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      if (response.data.outOfStock) {
        alert("Some items are out of stock:\n" + response.data.outOfStock.map(item =>
          `${item.name}: Only ${item.available} available, you requested ${item.requested}`
        ).join("\n"));
      } else {
        alert(response.data.message);
      }
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
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street Address' />
        <div className='Multi-fields'>
          <select required name="city" onChange={onChangeHandler} value={data.city} className="city-select">
            {tamilNaduCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' readOnly />
        </div>
        <div className='Multi-fields'>
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Pin Code' />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' readOnly />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number' pattern="[0-9]{10}" />

        <div className="delivery-type-selector">
          <p className="section-title">Delivery Type</p>
          <div className="delivery-options">
            <label className={`delivery-option ${deliveryType === "Same Day" ? "selected" : ""}`}>
              <input
                type="radio"
                name="deliveryType"
                value="Same Day"
                checked={deliveryType === "Same Day"}
                onChange={(e) => setDeliveryType(e.target.value)}
              />
              <span className="option-content">
                <span className="option-icon">⚡</span>
                <span className="option-details">
                  <strong>Same Day Delivery</strong>
                  <small>₹40 - Order before 2 PM</small>
                </span>
              </span>
            </label>
            <label className={`delivery-option ${deliveryType === "Next Day" ? "selected" : ""}`}>
              <input
                type="radio"
                name="deliveryType"
                value="Next Day"
                checked={deliveryType === "Next Day"}
                onChange={(e) => setDeliveryType(e.target.value)}
              />
              <span className="option-content">
                <span className="option-icon">📦</span>
                <span className="option-details">
                  <strong>Next Day Delivery</strong>
                  <small>₹25 - Delivered by tomorrow</small>
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee ({deliveryType})</p>
              <p>₹{deliveryFee}.00</p>
            </div>
            <hr />
            <div className="cart-total-details total-row">
              <p><b>Total</b></p>
              <p><b>₹{(getTotalCartAmount() + deliveryFee).toFixed(2)}</b></p>
            </div>
          </div>
          <button type='submit'>Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

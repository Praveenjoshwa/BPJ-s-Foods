import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, product_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const deliveryFee = 40; // ₹40 delivery fee

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />
        {product_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image.startsWith("http") ? item.image : url + "/images/" + item.image} alt="" />
                  <div className="cart-item-name-wrapper">
                    <p>{item.name}</p>
                    {item.tamilName && <span className="tamil-name">{item.tamilName}</span>}
                  </div>
                  <p>₹{item.price}/{item.unit}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>✕</p>
                </div>
                <hr />
              </div>
            )
          }
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p><b>Total</b></p>
              <p><b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryFee}</b></p>
            </div>
          </div>
          <button onClick={() => !token ? alert("Please Sign In") : navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Enter promo code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>

      <div className="delivery-info">
        <h3>🚚 Delivery Options</h3>
        <div className="delivery-options">
          <div className="delivery-option selected">
            <span className="option-icon">⚡</span>
            <div>
              <strong>Same Day Delivery</strong>
              <p>₹40 - Order before 2 PM</p>
            </div>
          </div>
          <div className="delivery-option">
            <span className="option-icon">📦</span>
            <div>
              <strong>Next Day Delivery</strong>
              <p>₹25 - Delivered by tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Cart

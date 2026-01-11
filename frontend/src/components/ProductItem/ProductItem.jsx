import React, { useContext } from 'react'
import "./ProductItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const ProductItem = ({ id, name, tamilName, price, description, image, unit, stock, isOrganic, brand }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const getStockStatus = () => {
        if (stock === 0) return { text: "Out of Stock", class: "out-of-stock" };
        if (stock <= 10) return { text: "Low Stock", class: "low-stock" };
        return { text: "In Stock", class: "in-stock" };
    };

    const stockStatus = getStockStatus();

    return (
        <div className='product-item'>
            <div className="product-item-img-container">
                <img src={image.startsWith("http") ? image : url + "/images/" + image} alt={name} className="product-item-image" />
                {isOrganic && <span className="organic-badge">🌿 Organic</span>}
                {stock === 0 ? (
                    <div className="out-of-stock-overlay">Out of Stock</div>
                ) : (
                    !cartItems[id]
                        ? <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white}></img>
                        : <div className='product-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                )}
            </div>
            <div className="product-item-info">
                <div className="product-item-name-rating">
                    <div className="product-name-wrapper">
                        <p className="product-name">{name}</p>
                        {tamilName && <p className="tamil-name">{tamilName}</p>}
                    </div>
                    <span className={`stock-badge ${stockStatus.class}`}>{stockStatus.text}</span>
                </div>
                <p className="product-item-desc">{description}</p>
                <div className="product-item-footer">
                    <p className="product-item-price">₹{price}<span className="unit">/{unit}</span></p>
                    {brand && <span className="brand-tag">{brand}</span>}
                </div>
            </div>
        </div>
    )
}

export default ProductItem

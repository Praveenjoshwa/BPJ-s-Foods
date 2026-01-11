import React from 'react'
import "./ProductDisplay.css"
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItem/ProductItem'
import Loader from '../Loader/Loader'

const ProductDisplay = ({ category }) => {
    const { product_list, loading } = useContext(StoreContext);

    // if (loading) {
    //     return <Loader />;
    // }

    return (
        <div className='product-display' id="product-display">
            <h2>Fresh Groceries for You</h2>
            <div className="product-display-list">
                {product_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <ProductItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                tamilName={item.tamilName}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                unit={item.unit}
                                stock={item.stock}
                                isOrganic={item.isOrganic}
                                brand={item.brand}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default ProductDisplay

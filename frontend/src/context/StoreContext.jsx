import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_API_URL
        ? (import.meta.env.VITE_API_URL.startsWith('http') ? import.meta.env.VITE_API_URL : `https://${import.meta.env.VITE_API_URL}`)
        : "http://localhost:4000";
    const [token, setToken] = useState("");
    const [showLogin, setShowLogin] = useState(false);

    const [product_list, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const addToCart = async (itemId) => {
        if (!token) {
            toast.warn("Please sign up or login to add items to cart");
            return;
        }

        // Check if item is in stock
        const product = product_list.find(p => p._id === itemId);
        if (product && product.stock <= 0) {
            toast.error("Sorry, this item is out of stock");
            return;
        }

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            // Check if adding more would exceed stock
            if (product && cartItems[itemId] >= product.stock) {
                toast.warn(`Only ${product.stock} items available in stock`);
                return;
            }
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = product_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }


    const fetchProductList = async () => {
        console.log("Fetching product list from:", url + "/api/product/list");
        setLoading(true);
        try {
            const response = await axios.get(url + "/api/product/list");
            console.log("API Response:", response.data);
            if (response.data.success) {
                setProductList(response.data.data);
            }
        } catch (error) {
            console.error("Primary API failed, trying fallback:", error.message);
            // Fallback to old API for backwards compatibility
            try {
                const response = await axios.get(url + "/api/food/list");
                setProductList(response.data.data);
            } catch (err) {
                console.error("Fallback API also failed:", err.message);
            }
        } finally {
            console.log("Setting loading to false");
            setLoading(false);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.error("Failed to load cart data:", response.data.message);
                if (response.data.message === "User not found" || response.data.message === "Not Authorized Login Again") {
                    localStorage.removeItem("token");
                    setToken("");
                }
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }

    useEffect(() => {

        async function loadData() {
            await fetchProductList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));

            }
        }
        loadData();
    }, [])

    const contextValue = {
        product_list,
        food_list: product_list, // Backwards compatibility
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        showLogin,
        setShowLogin,
        loading
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
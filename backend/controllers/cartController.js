import userModel from "../models/userModel.js"




// add items to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        const cartData = userData.cartData;

        const itemId = req.body.itemId;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};


//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({
            success: true, message: "removed from cart"
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "remove faild" })

    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error " })

    }
}

export { addToCart, removeFromCart, getCart }
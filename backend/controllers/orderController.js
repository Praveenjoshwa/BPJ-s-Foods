import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Reduce stock helper function
const reduceStock = async (items) => {
  try {
    for (const item of items) {
      await productModel.findByIdAndUpdate(
        item._id,
        { $inc: { stock: -item.quantity } }
      );
    }
    return true;
  } catch (error) {
    console.log("Error reducing stock:", error);
    return false;
  }
};

// Check stock availability
const validateStock = async (items) => {
  const outOfStock = [];
  for (const item of items) {
    const product = await productModel.findById(item._id);
    if (!product || product.stock < item.quantity) {
      outOfStock.push({
        name: product ? product.name : "Unknown Product",
        available: product ? product.stock : 0,
        requested: item.quantity
      });
    }
  }
  return outOfStock;
};

import { sendNewOrderNotification } from "../config/telegramBot.js";

const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

  try {
    // Validate stock before placing order
    const outOfStock = await validateStock(req.body.items);
    if (outOfStock.length > 0) {
      return res.json({
        success: false,
        message: "Some items are out of stock",
        outOfStock: outOfStock
      });
    }

    const newOrder = new orderModel({
      userID: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      deliveryType: req.body.deliveryType || "Same Day"
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Send Telegram Notification (if COD or immediate)
    // Note: Usually verification handles the 'confirmed' notification, but for COD we might want it here.
    // Assuming verification is strictly for Stripe payment success.

    // Stripe line items - prices in INR (paise)
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to paise
      },
      quantity: item.quantity,
    }));

    // Add delivery fee (₹40 for Same Day, ₹25 for Next Day)
    const deliveryFee = req.body.deliveryType === "Next Day" ? 25 : 40;
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryFee * 100, // Convert to paise
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

const verifyorder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      const order = await orderModel.findById(orderId);
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      // Reduce stock after successful payment
      if (order && order.items) {
        await reduceStock(order.items);
      }

      // Send Telegram Notification regarding Paid Order
      sendNewOrderNotification(order);

      res.json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying order" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userID: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log("Updating status for:", orderId, "to", status);

    // Get collection info
    console.log("Model collection name:", orderModel.collection.collectionName);

    // Get all orders and manually match
    const allOrders = await orderModel.find({});
    console.log("Found", allOrders.length, "orders via model.find()");
    const matchingOrder = allOrders.find(o => o._id.toString() === orderId);

    if (matchingOrder) {
      console.log("Matched order _id:", matchingOrder._id);
      console.log("_id type:", typeof matchingOrder._id, "constructor:", matchingOrder._id.constructor.name);

      // Try using mongoose connection directly
      const mongoose = (await import('mongoose')).default;
      const db = mongoose.connection.db;
      const ordersCollection = db.collection('orders');

      console.log("Attempting update via mongoose.connection.db.collection('orders')...");
      const result = await ordersCollection.updateOne(
        { _id: matchingOrder._id },
        { $set: { status: status } }
      );

      console.log("Update result:", JSON.stringify(result));

      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        const updatedOrder = await orderModel.findOne({ _id: matchingOrder._id });
        console.log("Verified status:", updatedOrder?.status);
        res.json({ success: true, message: "Status Updated", order: updatedOrder || { ...matchingOrder._doc, status } });
      } else {
        // Try with string ID query
        console.log("Trying with string _id...");
        const result2 = await ordersCollection.updateOne(
          { _id: orderId },
          { $set: { status: status } }
        );
        console.log("String ID update result:", JSON.stringify(result2));

        if (result2.matchedCount > 0) {
          res.json({ success: true, message: "Status Updated", order: { ...matchingOrder._doc, status } });
        } else {
          res.json({ success: false, message: "Update failed - no match" });
        }
      }
    } else {
      console.error("Order not found!", orderId);
      res.json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.log("Update error:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyorder, userOrders, listOrders, updateStatus };

import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { placeOrder, verifyorder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyorder)
orderRouter.post('/userorders', authMiddleWare, userOrders)
orderRouter.get('/list', listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter;
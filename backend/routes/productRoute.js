import express from "express";
import {
    addProduct,
    listProducts,
    removeProduct,
    updateProduct,
    updateStock,
    checkStock,
    getProductsByCategory
} from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProducts);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/remove", removeProduct);
productRouter.post("/update", upload.single("image"), updateProduct);
productRouter.post("/stock", updateStock);
productRouter.post("/check-stock", checkStock);

export default productRouter;

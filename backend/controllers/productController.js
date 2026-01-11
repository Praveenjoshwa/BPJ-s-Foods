import productModel from "../models/productModel.js";
import fs from "fs";

// Add product item
const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name: req.body.name,
        tamilName: req.body.tamilName || "",
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit || "kg",
        stock: req.body.stock || 0,
        brand: req.body.brand || "",
        isOrganic: req.body.isOrganic === "true" || req.body.isOrganic === true,
        category: req.body.category,
        image: image_filename
    });

    try {
        await product.save();
        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding product" });
    }
};

// Get all products list
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching products" });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await productModel.find({ category: category });
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching products by category" });
    }
};

// Remove product item
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (product.image && !product.image.startsWith("http")) {
            fs.unlink(`uploads/${product.image}`, () => { });
        }
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing product" });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            tamilName: req.body.tamilName,
            description: req.body.description,
            price: req.body.price,
            unit: req.body.unit,
            stock: req.body.stock,
            brand: req.body.brand,
            isOrganic: req.body.isOrganic === "true" || req.body.isOrganic === true,
            category: req.body.category
        };

        // If new image is uploaded
        if (req.file) {
            const oldProduct = await productModel.findById(req.body.id);
            if (oldProduct.image && !oldProduct.image.startsWith("http")) {
                fs.unlink(`uploads/${oldProduct.image}`, () => { });
            }
            updateData.image = req.file.filename;
        }

        await productModel.findByIdAndUpdate(req.body.id, updateData);
        res.json({ success: true, message: "Product Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating product" });
    }
};

// Update stock only
const updateStock = async (req, res) => {
    try {
        const { id, stock } = req.body;
        await productModel.findByIdAndUpdate(id, { stock: stock });
        res.json({ success: true, message: "Stock Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating stock" });
    }
};

// Reduce stock after order (internal use)
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
const checkStock = async (req, res) => {
    try {
        const { items } = req.body;
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

        if (outOfStock.length > 0) {
            res.json({
                success: false,
                message: "Some items are out of stock",
                outOfStock: outOfStock
            });
        } else {
            res.json({ success: true, message: "All items in stock" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error checking stock" });
    }
};

export {
    addProduct,
    listProducts,
    removeProduct,
    updateProduct,
    updateStock,
    reduceStock,
    checkStock,
    getProductsByCategory
};

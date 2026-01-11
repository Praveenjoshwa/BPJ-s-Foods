import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tamilName: { type: String, default: "" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    unit: {
        type: String,
        required: true,
        enum: ["kg", "g", "ml", "L", "piece", "dozen", "pack"],
        default: "kg"
    },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String, default: "" },
    isOrganic: { type: Boolean, default: false },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

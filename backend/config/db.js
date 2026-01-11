import mongoose from "mongoose";

export const connectDB = async () => {
    const connectionString = process.env.MONGODB_URI || process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/food-del";
    await mongoose.connect(connectionString).then(() => console.log("DB Connected"));
}
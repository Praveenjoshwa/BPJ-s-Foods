import mongoose from "mongoose";

export const connectDB = async () => {
    // await mongoose.connect('mongodb+srv://bpj4510:praveen123@cluster0.mhbx0yr.mongodb.net/food-del').then(()=>console.log("DB Connected"));
    await mongoose.connect('mongodb://127.0.0.1:27017/food-del').then(() => console.log("DB Connected"));
}
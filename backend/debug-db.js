import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGODB_URI || process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/food-del";

async function debugDB() {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to:", connectionString);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`Collection ${col.name} has ${count} documents`);
            if (count > 0) {
                const sample = await mongoose.connection.db.collection(col.name).findOne();
                console.log(`Sample from ${col.name}:`, JSON.stringify(sample, null, 2));
            }
        }

    } catch (err) {
        console.error("Debug Error:", err);
    } finally {
        await mongoose.connection.close();
    }
}

debugDB();

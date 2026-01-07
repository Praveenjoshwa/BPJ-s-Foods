import mongoose from 'mongoose';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB Atlas connection string with correct password
const ATLAS_URI = 'mongodb+srv://bpj4510:bpj4510@cluster0.mhbx0yr.mongodb.net/food-del?appName=Cluster0';

async function importData() {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(ATLAS_URI);
        console.log('✅ Connected to MongoDB Atlas');

        const db = mongoose.connection.db;

        // Read and import foods
        const foodsData = JSON.parse(fs.readFileSync(join(__dirname, 'mongodb-export/foods.json'), 'utf8'));
        if (foodsData.length > 0) {
            await db.collection('foods').deleteMany({});
            await db.collection('foods').insertMany(foodsData);
            console.log(`✅ Imported ${foodsData.length} foods`);
        }

        // Read and import users
        const usersData = JSON.parse(fs.readFileSync(join(__dirname, 'mongodb-export/users.json'), 'utf8'));
        if (usersData.length > 0) {
            await db.collection('users').deleteMany({});
            await db.collection('users').insertMany(usersData);
            console.log(`✅ Imported ${usersData.length} users`);
        }

        // Read and import orders
        const ordersData = JSON.parse(fs.readFileSync(join(__dirname, 'mongodb-export/orders.json'), 'utf8'));
        if (ordersData.length > 0) {
            await db.collection('orders').deleteMany({});
            await db.collection('orders').insertMany(ordersData);
            console.log(`✅ Imported ${ordersData.length} orders`);
        }

        console.log('\n🎉 Data migration completed successfully!');
        console.log('Your application is now connected to MongoDB Atlas Cloud Database');

    } catch (error) {
        console.error('❌ Error during migration:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed');
    }
}

importData();

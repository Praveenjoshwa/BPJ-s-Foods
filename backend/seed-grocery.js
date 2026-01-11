import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "./models/productModel.js";

dotenv.config();

// Connect to MongoDB
const connectionString = process.env.MONGODB_URI || process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/food-del";
mongoose.connect(connectionString)
    .then(() => console.log("DB Connected for Seeding"))
    .catch((err) => console.log("DB Connection Error", err));

const groceryData = [
    // Vegetables (10 items)
    {
        name: "Tomato",
        tamilName: "தக்காளி",
        image: "https://images.unsplash.com/photo-1546470427-227c7b0f5167?q=80&w=1000&auto=format&fit=crop",
        price: 40,
        unit: "kg",
        stock: 100,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh red tomatoes, perfect for curries, sambar, and rasam",
        category: "Vegetables"
    },
    {
        name: "Onion",
        tamilName: "வெங்காயம்",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1000&auto=format&fit=crop",
        price: 35,
        unit: "kg",
        stock: 150,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh onions from Nashik, essential for all Tamil cooking",
        category: "Vegetables"
    },
    {
        name: "Potato",
        tamilName: "உருளைக்கிழங்கு",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82ber-a79a-3d03-bb5a-e0a3d75e8e66?q=80&w=1000&auto=format&fit=crop",
        price: 30,
        unit: "kg",
        stock: 200,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh potatoes, great for fries, curries, and subzi",
        category: "Vegetables"
    },
    {
        name: "Brinjal",
        tamilName: "கத்திரிக்காய்",
        image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=1000&auto=format&fit=crop",
        price: 45,
        unit: "kg",
        stock: 80,
        brand: "Local Farm",
        isOrganic: false,
        description: "Purple brinjal perfect for kathirikai curry and kootu",
        category: "Vegetables"
    },
    {
        name: "Drumstick",
        tamilName: "முருங்கைக்காய்",
        image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1000&auto=format&fit=crop",
        price: 60,
        unit: "kg",
        stock: 50,
        brand: "Local Farm",
        isOrganic: true,
        description: "Fresh drumsticks, essential for sambar and kootu",
        category: "Vegetables"
    },
    {
        name: "Ladies Finger",
        tamilName: "வெண்டைக்காய்",
        image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?q=80&w=1000&auto=format&fit=crop",
        price: 50,
        unit: "kg",
        stock: 70,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh okra for vendakkai poriyal and curry",
        category: "Vegetables"
    },
    {
        name: "Green Chilli",
        tamilName: "பச்சை மிளகாய்",
        image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?q=80&w=1000&auto=format&fit=crop",
        price: 80,
        unit: "kg",
        stock: 40,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh green chillies for spicy Tamil cuisine",
        category: "Vegetables"
    },
    {
        name: "Curry Leaves",
        tamilName: "கறிவேப்பிலை",
        image: "https://images.unsplash.com/photo-1600298882525-d2ddea7f9e04?q=80&w=1000&auto=format&fit=crop",
        price: 20,
        unit: "pack",
        stock: 100,
        brand: "Local Farm",
        isOrganic: true,
        description: "Fresh curry leaves, essential for tempering",
        category: "Vegetables"
    },
    {
        name: "Coriander Leaves",
        tamilName: "கொத்தமல்லி",
        image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1000&auto=format&fit=crop",
        price: 25,
        unit: "pack",
        stock: 80,
        brand: "Local Farm",
        isOrganic: true,
        description: "Fresh coriander for garnishing and chutney",
        category: "Vegetables"
    },
    {
        name: "Carrot",
        tamilName: "கேரட்",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000&auto=format&fit=crop",
        price: 55,
        unit: "kg",
        stock: 90,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh orange carrots for salad and cooking",
        category: "Vegetables"
    },

    // Fruits (10 items)
    {
        name: "Banana - Nendran",
        tamilName: "நேந்திரம் பழம்",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1000&auto=format&fit=crop",
        price: 60,
        unit: "dozen",
        stock: 50,
        brand: "Kerala Farms",
        isOrganic: true,
        description: "Premium Kerala Nendran bananas, great for chips and cooking",
        category: "Fruits"
    },
    {
        name: "Banana - Robusta",
        tamilName: "வாழைப்பழம்",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop",
        price: 45,
        unit: "dozen",
        stock: 100,
        brand: "Local Farm",
        isOrganic: false,
        description: "Sweet robusta bananas for daily consumption",
        category: "Fruits"
    },
    {
        name: "Mango - Alphonso",
        tamilName: "மாம்பழம்",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop",
        price: 350,
        unit: "kg",
        stock: 30,
        brand: "Ratnagiri",
        isOrganic: false,
        description: "Premium Alphonso mangoes, the king of fruits",
        category: "Fruits"
    },
    {
        name: "Pomegranate",
        tamilName: "மாதுளை",
        image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?q=80&w=1000&auto=format&fit=crop",
        price: 180,
        unit: "kg",
        stock: 40,
        brand: "Karnataka",
        isOrganic: false,
        description: "Fresh ruby red pomegranates, rich in antioxidants",
        category: "Fruits"
    },
    {
        name: "Papaya",
        tamilName: "பப்பாளி",
        image: "https://images.unsplash.com/photo-1517282009859-f000ec3b9087?q=80&w=1000&auto=format&fit=crop",
        price: 45,
        unit: "piece",
        stock: 60,
        brand: "Local Farm",
        isOrganic: true,
        description: "Fresh ripe papaya, great for digestion",
        category: "Fruits"
    },
    {
        name: "Guava",
        tamilName: "கொய்யா",
        image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?q=80&w=1000&auto=format&fit=crop",
        price: 70,
        unit: "kg",
        stock: 55,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh green guavas, rich in Vitamin C",
        category: "Fruits"
    },
    {
        name: "Apple - Shimla",
        tamilName: "ஆப்பிள்",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop",
        price: 180,
        unit: "kg",
        stock: 45,
        brand: "Shimla",
        isOrganic: false,
        description: "Fresh Shimla apples, crisp and sweet",
        category: "Fruits"
    },
    {
        name: "Orange",
        tamilName: "ஆரஞ்சு",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1000&auto=format&fit=crop",
        price: 120,
        unit: "kg",
        stock: 60,
        brand: "Nagpur",
        isOrganic: false,
        description: "Sweet Nagpur oranges, juicy and fresh",
        category: "Fruits"
    },
    {
        name: "Watermelon",
        tamilName: "தர்பூசணி",
        image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?q=80&w=1000&auto=format&fit=crop",
        price: 25,
        unit: "kg",
        stock: 40,
        brand: "Local Farm",
        isOrganic: false,
        description: "Fresh watermelon, perfect for summer",
        category: "Fruits"
    },
    {
        name: "Grapes - Green",
        tamilName: "திராட்சை",
        image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1000&auto=format&fit=crop",
        price: 90,
        unit: "kg",
        stock: 35,
        brand: "Nashik",
        isOrganic: false,
        description: "Sweet green grapes from Nashik",
        category: "Fruits"
    },

    // Rice & Grains (10 items)
    {
        name: "Ponni Rice",
        tamilName: "பொன்னி அரிசி",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop",
        price: 65,
        unit: "kg",
        stock: 200,
        brand: "Cauvery",
        isOrganic: false,
        description: "Premium Ponni rice from Thanjavur, perfect for daily meals",
        category: "Rice & Grains"
    },
    {
        name: "Idli Rice",
        tamilName: "இட்லி அரிசி",
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1000&auto=format&fit=crop",
        price: 55,
        unit: "kg",
        stock: 150,
        brand: "Traditional",
        isOrganic: false,
        description: "Special rice for soft idlis and dosas",
        category: "Rice & Grains"
    },
    {
        name: "Sona Masoori Rice",
        tamilName: "சோனா மசூரி",
        image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=1000&auto=format&fit=crop",
        price: 70,
        unit: "kg",
        stock: 180,
        brand: "Andhra Gold",
        isOrganic: false,
        description: "Light and aromatic Sona Masoori rice",
        category: "Rice & Grains"
    },
    {
        name: "Basmati Rice",
        tamilName: "பாஸ்மதி அரிசி",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop",
        price: 140,
        unit: "kg",
        stock: 100,
        brand: "India Gate",
        isOrganic: false,
        description: "Long grain aromatic Basmati rice for biryanis",
        category: "Rice & Grains"
    },
    {
        name: "Toor Dal",
        tamilName: "துவரம் பருப்பு",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop",
        price: 150,
        unit: "kg",
        stock: 120,
        brand: "Traditional",
        isOrganic: false,
        description: "Premium Toor dal for sambar and dal",
        category: "Rice & Grains"
    },
    {
        name: "Urad Dal",
        tamilName: "உளுந்து",
        image: "https://images.unsplash.com/photo-1558818498-28c1e002674f?q=80&w=1000&auto=format&fit=crop",
        price: 180,
        unit: "kg",
        stock: 90,
        brand: "Traditional",
        isOrganic: false,
        description: "Split urad dal for idli batter and vada",
        category: "Rice & Grains"
    },
    {
        name: "Moong Dal",
        tamilName: "பாசிப்பருப்பு",
        image: "https://images.unsplash.com/photo-1551462147-ff9b5a9ac26d?q=80&w=1000&auto=format&fit=crop",
        price: 160,
        unit: "kg",
        stock: 85,
        brand: "Traditional",
        isOrganic: true,
        description: "Yellow moong dal for light dal and sweets",
        category: "Rice & Grains"
    },
    {
        name: "Chana Dal",
        tamilName: "கடலைப்பருப்பு",
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=1000&auto=format&fit=crop",
        price: 130,
        unit: "kg",
        stock: 110,
        brand: "Traditional",
        isOrganic: false,
        description: "Chana dal for sundal and kootu",
        category: "Rice & Grains"
    },
    {
        name: "Wheat Atta",
        tamilName: "கோதுமை மாவு",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1000&auto=format&fit=crop",
        price: 50,
        unit: "kg",
        stock: 150,
        brand: "Aashirvaad",
        isOrganic: false,
        description: "Whole wheat flour for chapati and roti",
        category: "Rice & Grains"
    },
    {
        name: "Rava (Sooji)",
        tamilName: "ரவை",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
        price: 55,
        unit: "kg",
        stock: 100,
        brand: "Traditional",
        isOrganic: false,
        description: "Fine semolina for upma and kesari",
        category: "Rice & Grains"
    },

    // Oil & Masala (10 items)
    {
        name: "Coconut Oil",
        tamilName: "தேங்காய் எண்ணெய்",
        image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1000&auto=format&fit=crop",
        price: 200,
        unit: "L",
        stock: 80,
        brand: "Coco Soul",
        isOrganic: true,
        description: "Pure cold-pressed coconut oil for cooking",
        category: "Oil & Masala"
    },
    {
        name: "Gingelly Oil",
        tamilName: "நல்லெண்ணெய்",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1000&auto=format&fit=crop",
        price: 350,
        unit: "L",
        stock: 60,
        brand: "Idhayam",
        isOrganic: false,
        description: "Pure sesame oil for South Indian cooking",
        category: "Oil & Masala"
    },
    {
        name: "Groundnut Oil",
        tamilName: "கடலை எண்ணெய்",
        image: "https://images.unsplash.com/photo-1601488400542-59c15f7ad15f?q=80&w=1000&auto=format&fit=crop",
        price: 180,
        unit: "L",
        stock: 100,
        brand: "Gold Winner",
        isOrganic: false,
        description: "Refined groundnut oil for deep frying",
        category: "Oil & Masala"
    },
    {
        name: "Sambar Powder",
        tamilName: "சாம்பார் பொடி",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop",
        price: 180,
        unit: "pack",
        stock: 120,
        brand: "Aachi",
        isOrganic: false,
        description: "Authentic Tamil Nadu sambar masala",
        category: "Oil & Masala"
    },
    {
        name: "Rasam Powder",
        tamilName: "ரசம் பொடி",
        image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1000&auto=format&fit=crop",
        price: 150,
        unit: "pack",
        stock: 100,
        brand: "Aachi",
        isOrganic: false,
        description: "Traditional rasam powder for tangy rasam",
        category: "Oil & Masala"
    },
    {
        name: "Mustard Seeds",
        tamilName: "கடுகு",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1000&auto=format&fit=crop",
        price: 60,
        unit: "pack",
        stock: 150,
        brand: "Traditional",
        isOrganic: false,
        description: "Black mustard seeds for tempering",
        category: "Oil & Masala"
    },
    {
        name: "Cumin Seeds",
        tamilName: "சீரகம்",
        image: "https://images.unsplash.com/photo-1599909631715-bee36db21240?q=80&w=1000&auto=format&fit=crop",
        price: 120,
        unit: "pack",
        stock: 90,
        brand: "Traditional",
        isOrganic: false,
        description: "Aromatic cumin seeds for Indian cooking",
        category: "Oil & Masala"
    },
    {
        name: "Turmeric Powder",
        tamilName: "மஞ்சள் தூள்",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=1000&auto=format&fit=crop",
        price: 80,
        unit: "pack",
        stock: 140,
        brand: "Everest",
        isOrganic: true,
        description: "Pure Erode turmeric powder",
        category: "Oil & Masala"
    },
    {
        name: "Red Chilli Powder",
        tamilName: "மிளகாய் தூள்",
        image: "https://images.unsplash.com/photo-1599909629698-9c63d89a2875?q=80&w=1000&auto=format&fit=crop",
        price: 130,
        unit: "pack",
        stock: 110,
        brand: "Aachi",
        isOrganic: false,
        description: "Spicy red chilli powder from Guntur",
        category: "Oil & Masala"
    },
    {
        name: "Coriander Powder",
        tamilName: "மல்லித்தூள்",
        image: "https://images.unsplash.com/photo-1599909629698-9c63d89a2875?q=80&w=1000&auto=format&fit=crop",
        price: 90,
        unit: "pack",
        stock: 100,
        brand: "Everest",
        isOrganic: false,
        description: "Fresh ground coriander powder",
        category: "Oil & Masala"
    },

    // Dairy (10 items)
    {
        name: "Aavin Milk",
        tamilName: "ஆவின் பால்",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop",
        price: 56,
        unit: "L",
        stock: 200,
        brand: "Aavin",
        isOrganic: false,
        description: "Fresh toned milk from Aavin",
        category: "Dairy"
    },
    {
        name: "Arokya Milk",
        tamilName: "ஆரோக்கிய பால்",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000&auto=format&fit=crop",
        price: 60,
        unit: "L",
        stock: 150,
        brand: "Arokya",
        isOrganic: false,
        description: "Full cream Arokya milk",
        category: "Dairy"
    },
    {
        name: "Curd",
        tamilName: "தயிர்",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop",
        price: 45,
        unit: "kg",
        stock: 100,
        brand: "Aavin",
        isOrganic: false,
        description: "Fresh set curd, perfect for rice and raita",
        category: "Dairy"
    },
    {
        name: "Paneer",
        tamilName: "பன்னீர்",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
        price: 350,
        unit: "kg",
        stock: 40,
        brand: "Amul",
        isOrganic: false,
        description: "Fresh cottage cheese for curries and snacks",
        category: "Dairy"
    },
    {
        name: "Butter",
        tamilName: "வெண்ணெய்",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=1000&auto=format&fit=crop",
        price: 55,
        unit: "pack",
        stock: 80,
        brand: "Amul",
        isOrganic: false,
        description: "Salted butter for bread and cooking",
        category: "Dairy"
    },
    {
        name: "Ghee",
        tamilName: "நெய்",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=1000&auto=format&fit=crop",
        price: 600,
        unit: "L",
        stock: 50,
        brand: "Aavin",
        isOrganic: false,
        description: "Pure cow ghee for cooking and sweets",
        category: "Dairy"
    },
    {
        name: "Cheese Slice",
        tamilName: "சீஸ்",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1000&auto=format&fit=crop",
        price: 120,
        unit: "pack",
        stock: 60,
        brand: "Amul",
        isOrganic: false,
        description: "Processed cheese slices for sandwiches",
        category: "Dairy"
    },
    {
        name: "Fresh Cream",
        tamilName: "கிரீம்",
        image: "https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?q=80&w=1000&auto=format&fit=crop",
        price: 85,
        unit: "pack",
        stock: 45,
        brand: "Amul",
        isOrganic: false,
        description: "Fresh cooking cream for gravies",
        category: "Dairy"
    },
    {
        name: "Buttermilk",
        tamilName: "மோர்",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop",
        price: 25,
        unit: "L",
        stock: 80,
        brand: "Aavin",
        isOrganic: false,
        description: "Fresh buttermilk with salt and spices",
        category: "Dairy"
    },
    {
        name: "Lassi",
        tamilName: "லஸ்ஸி",
        image: "https://images.unsplash.com/photo-1626203051268-5766f1bd5633?q=80&w=1000&auto=format&fit=crop",
        price: 30,
        unit: "pack",
        stock: 70,
        brand: "Amul",
        isOrganic: false,
        description: "Sweet mango lassi, refreshing drink",
        category: "Dairy"
    },

    // Snacks (10 items)
    {
        name: "Murukku",
        tamilName: "முறுக்கு",
        image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?q=80&w=1000&auto=format&fit=crop",
        price: 180,
        unit: "pack",
        stock: 100,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Crispy traditional murukku snack",
        category: "Snacks"
    },
    {
        name: "Thattai",
        tamilName: "தட்டை",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1000&auto=format&fit=crop",
        price: 160,
        unit: "pack",
        stock: 80,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Flat crispy rice flour snack",
        category: "Snacks"
    },
    {
        name: "Banana Chips",
        tamilName: "வாழைக்காய் சிப்ஸ்",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1000&auto=format&fit=crop",
        price: 200,
        unit: "pack",
        stock: 90,
        brand: "Kerala",
        isOrganic: false,
        description: "Crispy Kerala style banana chips",
        category: "Snacks"
    },
    {
        name: "Mixture",
        tamilName: "மிக்ஸர்",
        image: "https://images.unsplash.com/photo-1587843565463-69a42a1f3e7a?q=80&w=1000&auto=format&fit=crop",
        price: 140,
        unit: "pack",
        stock: 110,
        brand: "Haldiram",
        isOrganic: false,
        description: "South Indian mixture with peanuts",
        category: "Snacks"
    },
    {
        name: "Ribbon Pakoda",
        tamilName: "ரிப்பன் பக்கோடா",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
        price: 170,
        unit: "pack",
        stock: 75,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Ribbon shaped crispy snack",
        category: "Snacks"
    },
    {
        name: "Seedai",
        tamilName: "சீடை",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1000&auto=format&fit=crop",
        price: 190,
        unit: "pack",
        stock: 60,
        brand: "Traditional",
        isOrganic: false,
        description: "Sweet and crispy seedai balls",
        category: "Snacks"
    },
    {
        name: "Adhirasam",
        tamilName: "அதிரசம்",
        image: "https://images.unsplash.com/photo-1551024601-569d6f7e12ad?q=80&w=1000&auto=format&fit=crop",
        price: 250,
        unit: "pack",
        stock: 45,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Traditional sweet from jaggery and rice",
        category: "Snacks"
    },
    {
        name: "Mysore Pak",
        tamilName: "மைசூர் பாக்",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1000&auto=format&fit=crop",
        price: 400,
        unit: "pack",
        stock: 55,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Melt-in-mouth ghee sweet",
        category: "Snacks"
    },
    {
        name: "Laddu",
        tamilName: "லட்டு",
        image: "https://images.unsplash.com/photo-1605197765234-a2c79679e7fa?q=80&w=1000&auto=format&fit=crop",
        price: 350,
        unit: "pack",
        stock: 70,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Boondi laddu made with ghee",
        category: "Snacks"
    },
    {
        name: "Jalebi",
        tamilName: "ஜிலேபி",
        image: "https://images.unsplash.com/photo-1666190073730-919ee2eb02f5?q=80&w=1000&auto=format&fit=crop",
        price: 280,
        unit: "pack",
        stock: 50,
        brand: "Grand Sweets",
        isOrganic: false,
        description: "Crispy sweet spirals soaked in sugar syrup",
        category: "Snacks"
    }
];

const seedDB = async () => {
    try {
        await productModel.deleteMany({}); // Clear existing data
        console.log("Cleared existing product data");
        await productModel.insertMany(groceryData);
        console.log("Database Seeded Successfully with Tamil Nadu Grocery Items!");
        console.log(`Total products added: ${groceryData.length}`);
    } catch (error) {
        console.log("Error Seeding Database", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();

import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/food-del")
    .then(() => console.log("DB Connected for Seeding"))
    .catch((err) => console.log("DB Connection Error", err));

const foodData = [
    // Salad (10 items)
    {
        name: "Greek Salad",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Caesar Salad",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Fresh romaine lettuce with croutons and parmesan cheese",
        category: "Salad"
    },
    {
        name: "Caprese Salad",
        image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e2f?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Fresh mozzarella, tomatoes, and sweet basil",
        category: "Salad"
    },
    {
        name: "Cobb Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Garden salad with chicken, bacon, and eggs",
        category: "Salad"
    },
    {
        name: "Waldorf Salad",
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Fruit and nut salad generally made of fresh apples, celery, walnuts, and grapes",
        category: "Salad"
    },
    {
        name: "Nicoise Salad",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
        price: 20,
        description: "French salad with tuna, green beans, and hard boiled eggs",
        category: "Salad"
    },
    {
        name: "Garden Salad",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop",
        price: 10,
        description: "Fresh garden vegetables with vinaigrette dressing",
        category: "Salad"
    },
    {
        name: "Quinoa Salad",
        image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1000&auto=format&fit=crop",
        price: 17,
        description: "Healthy quinoa salad with vegetables and herbs",
        category: "Salad"
    },
    {
        name: "Pasta Salad",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000&auto=format&fit=crop",
        price: 13,
        description: "Chilled pasta salad with vegetables and italian dressing",
        category: "Salad"
    },
    {
        name: "Fruit Salad",
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1000&auto=format&fit=crop",
        price: 11,
        description: "Fresh seasonal fruits mix",
        category: "Salad"
    },

    // Rolls (10 items)
    {
        name: "Veg Roll",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop",
        price: 12,
        description: "Crispy vegetable roll with spicy sauce",
        category: "Rolls"
    },
    {
        name: "Chicken Roll",
        image: "https://images.unsplash.com/photo-1606756790138-7c488320e54f?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Tender chicken wrapped in soft flatbread",
        category: "Rolls"
    },
    {
        name: "Paneer Roll",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Spiced paneer cubes wrapped in paratha",
        category: "Rolls"
    },
    {
        name: "Egg Roll",
        image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1000&auto=format&fit=crop",
        price: 13,
        description: "Classic egg roll with onions and sauces",
        category: "Rolls"
    },
    {
        name: "Spring Roll",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
        price: 10,
        description: "Crispy fried spring rolls with vegetable filling",
        category: "Rolls"
    },
    {
        name: "Mutton Roll",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Spicy mutton keema wrapped in paratha",
        category: "Rolls"
    },
    {
        name: "Cheese Roll",
        image: "https://images.unsplash.com/photo-1505253758473-96b701d2cd03?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Cheesy goodness in every bite",
        category: "Rolls"
    },
    {
        name: "Shawarma Roll",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=1000&auto=format&fit=crop",
        price: 17,
        description: "Middle eastern style chicken shawarma roll",
        category: "Rolls"
    },
    {
        name: "Kathi Roll",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Traditional Kolkata style kathi roll",
        category: "Rolls"
    },
    {
        name: "Double Egg Roll",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Loaded with double eggs for extra protein",
        category: "Rolls"
    },

    // Deserts (10 items)
    {
        name: "Chocolate Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
        price: 20,
        description: "Rich and moist chocolate cake",
        category: "Deserts"
    },
    {
        name: "Cheesecake",
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=1000&auto=format&fit=crop",
        price: 22,
        description: "Creamy classic cheesecake with berry topping",
        category: "Deserts"
    },
    {
        name: "Brownie",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop",
        price: 12,
        description: "Fudgy chocolate brownie with walnuts",
        category: "Deserts"
    },
    {
        name: "Ice Cream Sundae",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Vanilla ice cream with chocolate sauce and nuts",
        category: "Deserts"
    },
    {
        name: "Tiramisu",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Classic Italian coffee-flavoured dessert",
        category: "Deserts"
    },
    {
        name: "Apple Pie",
        image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Traditional apple pie with cinnamon",
        category: "Deserts"
    },
    {
        name: "Panna Cotta",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Italian sweetened cream dessert",
        category: "Deserts"
    },
    {
        name: "Macarons",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Colorful french almond cookies",
        category: "Deserts"
    },
    {
        name: "Cupcake",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1000&auto=format&fit=crop",
        price: 8,
        description: "Sweet vanilla cupcake with frosting",
        category: "Deserts"
    },
    {
        name: "Donuts",
        image: "https://images.unsplash.com/photo-1551024601-569d6f7e12ad?q=80&w=1000&auto=format&fit=crop",
        price: 10,
        description: "Glazed donuts with sprinkles",
        category: "Deserts"
    },

    // Sandwich (10 items)
    {
        name: "Club Sandwich",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Classic triple decker sandwich",
        category: "Sandwich"
    },
    {
        name: "Grilled Cheese",
        image: "https://images.unsplash.com/photo-1528736235302-52922df3c122?q=80&w=1000&auto=format&fit=crop",
        price: 12,
        description: "Toasted bread with melted cheese",
        category: "Sandwich"
    },
    {
        name: "Veg Sandwich",
        image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=1000&auto=format&fit=crop",
        price: 10,
        description: "Fresh vegetable sandwich with mint chutney",
        category: "Sandwich"
    },
    {
        name: "Chicken Sandwich",
        image: "https://images.unsplash.com/photo-1603903631889-b5f3ba4d5b9b?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Juicy chicken breast in toasted bread",
        category: "Sandwich"
    },
    {
        name: "BLT Sandwich",
        image: "https://images.unsplash.com/photo-1553909489-cd47e390c657?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Bacon, lettuce, and tomato sandwich",
        category: "Sandwich"
    },
    {
        name: "Tuna Sandwich",
        image: "https://images.unsplash.com/photo-1550505393-25939e70a9aa?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Tuna salad sandwich with mayo",
        category: "Sandwich"
    },
    {
        name: "Egg Sandwich",
        image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?q=80&w=1000&auto=format&fit=crop",
        price: 12,
        description: "Boiled egg slices with pepper and mayo",
        category: "Sandwich"
    },
    {
        name: "Paneer Sandwich",
        image: "https://images.unsplash.com/photo-1539252554453-1f93143f77d5?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Spiced paneer filling in grilled bread",
        category: "Sandwich"
    },
    {
        name: "Ham Sandwich",
        image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Classic ham and cheese sandwich",
        category: "Sandwich"
    },
    {
        name: "Reuben Sandwich",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Corned beef, swiss cheese, and sauerkraut",
        category: "Sandwich"
    },

    // Cake (10 items)
    {
        name: "Black Forest",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1000&auto=format&fit=crop",
        price: 25,
        description: "Chocolate sponge cake with cherries and cream",
        category: "Cake"
    },
    {
        name: "Red Velvet",
        image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=1000&auto=format&fit=crop",
        price: 28,
        description: "Classic red velvet cake with cream cheese frosting",
        category: "Cake"
    },
    {
        name: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
        price: 20,
        description: "Simple and delicious vanilla sponge cake",
        category: "Cake"
    },
    {
        name: "Pineapple Cake",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1000&auto=format&fit=crop",
        price: 22,
        description: "Fresh pineapple cream cake",
        category: "Cake"
    },
    {
        name: "Strawberry Cake",
        image: "https://images.unsplash.com/photo-1611293388250-580b08c4a145?q=80&w=1000&auto=format&fit=crop",
        price: 24,
        description: "Pink strawberry flavored cake",
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=1000&auto=format&fit=crop",
        price: 23,
        description: "Crunchy butterscotch cake with caramel",
        category: "Cake"
    },
    {
        name: "Fruit Cake",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop",
        price: 26,
        description: "Loaded with dry fruits and nuts",
        category: "Cake"
    },
    {
        name: "Carrot Cake",
        image: "https://images.unsplash.com/photo-1622926421334-6829deee4b4b?q=80&w=1000&auto=format&fit=crop",
        price: 22,
        description: "Spiced carrot cake with cream cheese icing",
        category: "Cake"
    },
    {
        name: "Lemon Cake",
        image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=1000&auto=format&fit=crop",
        price: 21,
        description: "Zesty lemon flavored cake",
        category: "Cake"
    },
    {
        name: "Coffee Cake",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=1000&auto=format&fit=crop",
        price: 23,
        description: "Coffee infused sponge cake",
        category: "Cake"
    },

    // Pure Veg (10 items)
    {
        name: "Paneer Butter Masala",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Rich and creamy paneer gravy",
        category: "Pure Veg"
    },
    {
        name: "Dal Makhani",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Creamy black lentils cooked overnight",
        category: "Pure Veg"
    },
    {
        name: "Aloo Gobi",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Potato and cauliflower dry curry",
        category: "Pure Veg"
    },
    {
        name: "Palak Paneer",
        image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?q=80&w=1000&auto=format&fit=crop",
        price: 17,
        description: "Paneer cubes in spinach gravy",
        category: "Pure Veg"
    },
    {
        name: "Chana Masala",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Spicy chickpea curry",
        category: "Pure Veg"
    },
    {
        name: "Veg Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Aromatic rice with mixed vegetables",
        category: "Pure Veg"
    },
    {
        name: "Malai Kofta",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=1000&auto=format&fit=crop",
        price: 19,
        description: "Fried dumplings in creamy gravy",
        category: "Pure Veg"
    },
    {
        name: "Mix Veg",
        image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Seasonal vegetables cooked together",
        category: "Pure Veg"
    },
    {
        name: "Rajma Chawal",
        image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Kidney beans curry with rice",
        category: "Pure Veg"
    },
    {
        name: "Baingan Bharta",
        image: "https://images.unsplash.com/photo-1626509683556-50d440267167?q=80&w=1000&auto=format&fit=crop",
        price: 13,
        description: "Smoked eggplant mash with spices",
        category: "Pure Veg"
    },

    // Pasta (10 items)
    {
        name: "Arrabiata Pasta",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Spicy tomato sauce pasta",
        category: "Pasta"
    },
    {
        name: "Alfredo Pasta",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Creamy white sauce pasta",
        category: "Pasta"
    },
    {
        name: "Pesto Pasta",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000&auto=format&fit=crop",
        price: 19,
        description: "Pasta in fresh basil pesto sauce",
        category: "Pasta"
    },
    {
        name: "Carbonara",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop",
        price: 20,
        description: "Classic pasta with egg, cheese, and bacon",
        category: "Pasta"
    },
    {
        name: "Bolognese",
        image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Meat based tomato sauce pasta",
        category: "Pasta"
    },
    {
        name: "Lasagna",
        image: "https://images.unsplash.com/photo-1574868233972-1e6a3d8886aa?q=80&w=1000&auto=format&fit=crop",
        price: 22,
        description: "Layered pasta with meat and cheese",
        category: "Pasta"
    },
    {
        name: "Mac and Cheese",
        image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Cheesy macaroni pasta",
        category: "Pasta"
    },
    {
        name: "Ravioli",
        image: "https://images.unsplash.com/photo-1587740986334-54369561238c?q=80&w=1000&auto=format&fit=crop",
        price: 19,
        description: "Stuffed pasta dumplings",
        category: "Pasta"
    },
    {
        name: "Spaghetti Meatballs",
        image: "https://images.unsplash.com/photo-1515516947383-57413c7156f2?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Spaghetti with tomato sauce and meatballs",
        category: "Pasta"
    },
    {
        name: "Aglio e Olio",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Garlic and oil pasta",
        category: "Pasta"
    },

    // Noodles (10 items)
    {
        name: "Hakka Noodles",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop",
        price: 14,
        description: "Stir fried noodles with vegetables",
        category: "Noodles"
    },
    {
        name: "Schezwan Noodles",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Spicy noodles in schezwan sauce",
        category: "Noodles"
    },
    {
        name: "Chicken Noodles",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1000&auto=format&fit=crop",
        price: 16,
        description: "Noodles with chicken chunks",
        category: "Noodles"
    },
    {
        name: "Egg Noodles",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Stir fried noodles with scrambled eggs",
        category: "Noodles"
    },
    {
        name: "Singapore Noodles",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop",
        price: 17,
        description: "Curry flavored thin noodles",
        category: "Noodles"
    },
    {
        name: "Pad Thai",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Thai style stir fried rice noodles",
        category: "Noodles"
    },
    {
        name: "Ramen",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop",
        price: 20,
        description: "Japanese noodle soup",
        category: "Noodles"
    },
    {
        name: "Chow Mein",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop",
        price: 15,
        description: "Crispy fried noodles with sauce",
        category: "Noodles"
    },
    {
        name: "Udon Noodles",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000&auto=format&fit=crop",
        price: 19,
        description: "Thick wheat flour noodles",
        category: "Noodles"
    },
    {
        name: "Soba Noodles",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1000&auto=format&fit=crop",
        price: 18,
        description: "Healthy buckwheat noodles",
        category: "Noodles"
    }
];

const seedDB = async () => {
    try {
        await foodModel.deleteMany({}); // Optional: Clear existing data
        console.log("Cleared existing food data");
        await foodModel.insertMany(foodData);
        console.log("Database Seeded Successfully");
    } catch (error) {
        console.log("Error Seeding Database", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();

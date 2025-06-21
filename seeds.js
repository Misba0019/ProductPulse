const mongoose = require('mongoose');

const Product = require('./models/product');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(() => {
    console.log('Mongo Connection Open!');
}).catch(err => {
    console.log('Mongo Connection Error: Try again!');
    console.log(err)
});

// Sample products to seed the database
const seedProducts = [
    {
        name: 'Golden Apple',
        price: 2.25,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Fresh Broccoli',
        price: 1.75,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1518976024611-4886d7a7d57b?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Strawberry Yogurt',
        price: 3.10,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Purple Carrot',
        price: 1.20,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Mango Delight',
        price: 2.99,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1504674900247-ec6b0b4782d2?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Goat Cheese',
        price: 4.50,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Spinach Leaves',
        price: 1.30,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Greek Yogurt',
        price: 2.80,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Red Bell Pepper',
        price: 2.40,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80'
    }
];

// Insert seed products into the database
Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
});

// Note: Run this script ONCE to seed your database.
// You do not need to run this every time you start your server.
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
        name: 'Apple',
        price: 3,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1730592976122-61653bb61967?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Fresh Broccoli',
        price: 2,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1742970520195-bcf1261033eb?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Wild Berries(Mixed)',
        price: 3,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1669299824216-fdd5f4e22f7c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Strawberry Yogurt',
        price: 3,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1645466525466-647ef246067f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Carrot',
        price: 1,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Mango',
        price: 3,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1635716279493-d1e30afc25a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Goat Cheese',
        price: 5,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1691472898747-363d6d7409de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Spinach Leaves',
        price: 1,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwaW5hY2glMjBsZWF2ZXN8ZW58MHx8MHx8fDI%3D'
    },
    {
        name: 'Greek Yogurt',
        price: 3,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1564149503905-7fef56abc1f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Red Bell Pepper',
        price: 2,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1608737637507-9aaeb9f4bf30?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

// Function to delete all and re-seed
const seedDB = async () => {
    await Product.deleteMany({});
    console.log('Deleted all existing products.');

    await Product.insertMany(seedProducts);
    console.log('Inserted new seed products!');
};

// Run seeding
seedDB()
    .then(() => {
        mongoose.connection.close();
        console.log('Mongo connection closed!');
    })
    .catch(err => {
        console.error('Error during seeding:', err);
        mongoose.connection.close();
    });

// This script seeds the database with initial product data.
// Note: Run this script ONCE to seed your database.
// You do not need to run this every time you start your server.
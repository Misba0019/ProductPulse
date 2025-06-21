const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(() => {
    console.log('Mongo Connection Open!');
}).catch(err => {
    console.log('Mongo Connection Error: Try again!');
    console.log(err);
});

// App Configuration 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

// List all products or filter by category
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' });
    }
});

// Show form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

// Create a new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
});

// Show details of a specific product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/details', { product });
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

// Show form to edit a product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});

// Update a product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

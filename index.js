const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // Import the method-override package

const Product = require('./models/product'); // Import the Product Model

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(() => {
    console.log('Mongo Connection Open!');
}).catch(err => {
    console.log('Mongo Connection Error: Try again!');
    console.log(err);
});

app.set('views', path.join(__dirname, 'views')); // Set the views directory to the 'views' folder
app.set('view engine', 'ejs'); // Set the view engine to ejs
app.use(express.urlencoded({ extended: true })); // This will allow us to parse the body of the request
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy']; // This is an array of categories

// Get request for the products page
app.get('/products', async (req, res) => {
    const { category } = req.query; // Take the categories from the request query to compare.
    
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' });
    } // If the user has selected a category, we will filter the products by that category, otherwise we will show all products
});

// Get request for the new product page
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories }); // Give the user a new product form to fill out
});

// Post request for the products page
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
});

// Post request for the products page
app.get('/products/:id', async (req, res) => {
    const { id } = req.params; // Take the id from the request params
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/details', { product }); // Render the products/details.ejs file and pass the product object to it
});

// Delete request for the products page
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

// Get request for the edit product page
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});

// Put request for the products page
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

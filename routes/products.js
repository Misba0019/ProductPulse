const express = require('express');
const router = express.Router();

// Import the Product model
const Product = require('../models/product');

// Import custom error handling utilities
const AppError = require('../appError');
const validateObjectId = require('../validateObjId');
const wrapAsync = require('../wrapAsync');

// Define product categories
const categories = ['fruit', 'vegetable', 'dairy'];

// List all products or filter by category
router.get('/', wrapAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' });
    }
}));

// Show form to create a new product
router.get('/new', wrapAsync((req, res) => {
    res.render('products/new', { categories, product: null });
}));

// Create a new product
router.post('/', wrapAsync(async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
}));

// Show details of a specific product
router.get('/:id', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    let createdAt = "N/A";
    if (product.createdAt) {
        createdAt = new Date(product.createdAt).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }
    let updatedAt = "N/A";
    if (product.updatedAt) {
        updatedAt = new Date(product.updatedAt).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }
    res.render('products/details', { product, createdAt, updatedAt});
}));

// Delete a product
router.delete('/:id', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct){
        throw new AppError('Cannot delete: Product not found', 404);
    }
    res.redirect('/products');
}));

// Show form to edit a product
router.get('/:id/edit', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw new AppError('Cannot edit: Product not found', 404);
    }
    res.render('products/edit', { product, categories });
}));

// Update a product
router.put('/:id', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    if (!product){
        throw new AppError('Cannot update: Product not found', 404);
    }
    res.redirect(`/products/${product._id}`);
}));

module.exports = router;
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const wrapAsync = require('./wrapAsync');
const AppError = require('./appError');
const validateObjectId = require('./validateObjId');
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
app.get('/products', wrapAsync(async (req, res) => {
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
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

// Create a new product
app.post('/products', wrapAsync(async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
}));

// Show details of a specific product
app.get('/products/:id', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/details', { product });
}));

// Delete a product
app.delete('/products/:id', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct){
        throw new AppError('Cannot delete: Product not found', 404);
    }
    console.log(`Product Deleted: ${deletedProduct}`)
    res.redirect('/products');
}));

// Show form to edit a product
app.get('/products/:id/edit', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw new AppError('Cannot edit: Product not found', 404);
    }
    res.render('products/edit', { product, categories });
}));

// Update a product
app.put('/products/:id', validateObjectId, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    if (!product){
        throw new AppError('Cannot update: Product not found', 404);
    }
    res.redirect(`/products/${product._id}`);
}));

// Handle 404 errors for undefined routes
app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    // Validation errors
    if(err.name === 'ValidationError') {
        err.status = 400;
        let messages = '';
        for (let key in err.errors) {
            messages += `${err.errors[key].message} `;
        }
        err.msg = 'Validation Error: ' + messages;
    }

    // Default error handling
    const status = err.status || 500;
    const message = err.msg || 'Something went wrong';

    res.status(status).send(`<h1>Error ${status}</h1><p>${message}</p>`);
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

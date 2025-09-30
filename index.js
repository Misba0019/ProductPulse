const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const productRoutes = require('./routes/products');

const AppError = require('./appError');

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

// Redirect root to /products
app.get('/', (req, res) => {
    res.redirect('/products');
});

// Use product routes
app.use('/products', productRoutes);

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
        err.message = 'Validation Error: ' + messages;
    }

    // Default error handling
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(status).render('error', {status, message});
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

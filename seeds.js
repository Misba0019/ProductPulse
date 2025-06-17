const mongoose = require('mongoose');

const Product = require('./models/product');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(() => {
    console.log('Mongo Connection Open!');
}).catch(err => {
    console.log('Mongo Connection Error: Try again!');
    console.log(err)
});

// Seeded our database separate from our app

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// });
// p.save().then(p => {
//     console.log(p);
// }).catch(e => {
//     console.log(e);
// });

// This is for seeding our database
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable',
        img: 'https://plus.unsplash.com/premium_photo-1693266782255-10ae7abbd98d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit',
        img: 'https://plus.unsplash.com/premium_photo-1705932430293-a1d21fab094a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit',
        img: 'https://plus.unsplash.com/premium_photo-1724256227284-0e987ccd3f5e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Organic Celery',
        price: 1.5,
        category: 'vegetable',
        img: 'https://plus.unsplash.com/premium_photo-1723485646947-c73bf14ccdb7?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1616269267068-a94048945ded?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
]

// Inserting all the seed products into the database
// This is a one time thing, so we don't need to run this again
Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
});

// The above code is for seeding our database. We have created a list of products and then we are inserting them into our database.
// We are using the insertMany method to insert all the products at once.
// We are also using promises to handle the success and error cases. If the insertion is successful, we will log the response to the console.
// If there is an error, we will log the error to the console.
// We only need to run this code once to seed our database. We don't need to run this code every time we start our server. We can comment out this code once we have seeded our database.    

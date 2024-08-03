const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    rating: {
        rate: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }
});

// Create and export the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

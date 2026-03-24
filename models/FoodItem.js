const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/150',
    }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);

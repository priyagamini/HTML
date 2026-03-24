const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all food items
router.get('/', async (req, res) => {
    try {
        const items = await FoodItem.find({});
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Add a new food item
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, description, price, imageUrl, isAvailable } = req.body;
        const item = new FoodItem({ name, description, price, imageUrl, isAvailable });
        const createdItem = await item.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Update a food item
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, description, price, imageUrl, isAvailable } = req.body;
        const item = await FoodItem.findById(req.params.id);

        if (item) {
            item.name = name || item.name;
            item.description = description || item.description;
            item.price = price || item.price;
            item.imageUrl = imageUrl || item.imageUrl;
            item.isAvailable = isAvailable !== undefined ? isAvailable : item.isAvailable;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Delete a food item
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const item = await FoodItem.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

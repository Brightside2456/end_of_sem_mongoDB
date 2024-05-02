const express = require('express');
const ComplexQueries = require('../models/complexQueries');
const { getDb } = require('../db');

const complex_router = express.Router();

complex_router.get('/complex', async (req, res) => {
    const product_id = req.params.product_id;
    const price = parseFloat(req.query.price);
    
    try {
        const products = await ComplexQueries.findProductsByCategoryAndPriceRange(product_id, price);
        res.json(products);
        console.log("first")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving products" });
    }
});

module.exports = complex_router;

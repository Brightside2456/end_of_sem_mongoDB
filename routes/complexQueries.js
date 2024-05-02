const { Double } = require("mongodb");
const express = require('express');
const ComplexQueries = require('../models/complexQueries');
const { getDb } = require('../db');
const complex_router = express.Router();



complex_router.get('/transaction/:amount', async (req, res) => {
    const amount = parseFloat(req.params.amount);

    try {
        // console.log("first")
        const transactions = await ComplexQueries.findTransactionsWithTotalAmountGreaterThan(amount);
        res.json(transactions);
        // console.log("first")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving transactions" });
    }
});

complex_router.get('/product/:keyword', async (req, res) => {
    const keyword = req.params.keyword;

    try {
        const products = await ComplexQueries.findProductsByNameKeyword(keyword);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving products" });
    }
});


module.exports = complex_router;

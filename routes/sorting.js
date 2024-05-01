const express = require('express');
const Sort = require('../models/sorting_function');
const sort_router = express.Router();


// Route for sorting transactions by time
sort_router.get('/sortByTime', async (req, res) => {
    try {
        const sortedTransactions = await Sort.sortByTime();
        res.json(sortedTransactions);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for sorting transactions by amount
sort_router.get('/sortByAmount', async (req, res) => {
    try {

        console.log("sorting")
        const sortedTransactions = await Sort.sortByAmount();
        res.json(sortedTransactions);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = sort_router;

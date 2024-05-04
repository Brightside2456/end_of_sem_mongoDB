const { Double } = require("mongodb");
const Aggregation = require("../models/aggregation_functions")
const bw_router = require('express').Router()
const {getDb} = require('../db')


// const db = await  getDb()
bw_router.post("/insertFilter", async (req, res) => {
    const documentsToInsert = req.body.documents;
    const filter = req.body.filter;

    try {
        const db = await  getDb()
        
        const bulkOperations = documentsToInsert.map(documentToInsert => ({
            insertOne: { document: documentToInsert },
        }));

        // Perform bulk write operation to insert documents
        await db.collection('product').bulkWrite(bulkOperations);

        // Update documents based on the provided filter
        const updateResult = await db.collection('product').updateMany(
            { brand: filter.brand },
            { $set: { category: filter.newCategory } }
        );

        res.status(200).json({ message: 'Documents inserted and updated successfully' });
    } catch (error) {
        console.log('Here')
        console.error('Error performing bulk write operation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


bw_router.post("/invoice", async (req, res) => {
    const documentsToInsert = req.body;

    try {
        // Create bulk operations array
const db = await  getDb()

        const bulkOperations = documentsToInsert.map(documentToInsert => ({
            insertOne: { document: documentToInsert },
        }));

        // Execute bulk write operation
        const result = await db.collection('product').bulkWrite(bulkOperations);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error performing bulk write operation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = bw_router
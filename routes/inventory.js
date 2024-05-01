const { getDb } = require('../db');
const Inventory = require('../models/inventoryModel');
const express = require('express');
const i_router = express.Router();
const {ObjectId} = require('mongodb')

i_router.post("/", async(req, res) => {
    try {
        let result = await Inventory.createProduct(req.body);
        res.status(200).json(result);
    } catch (error) {
        
        console.log("Error inserting inventory", error);

        res.status(500).json({error: "Internal Server Error"})
    }
});
i_router.get("/", async (req, res) => {
    const page = req.query.p || 0
    try{
        let result = await Inventory.getAllProduct(page);
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});
i_router.get("/:id", async (req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await Inventory.getOneProduct(id)
            res.json(result);
        }
        else {
            res.status(400).json({ error: 'Invalid inventory ID' });
        }
    } catch (error) {
        console.error('Error getting Inventory details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
i_router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await Inventory.updateProduct(id, updateFields)
            res.json({ message: 'Inventory updated successfully', result });
        }
        else {
            res.status(400).json({ error: 'Invalid inventory ID' });
        }
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

i_router.delete("/:id", async(req, res) => {
    try {
        const oid = req.params.id
        if (ObjectId.isValid(oid)){
            const result = await Inventory.deleteProduct(oid)
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Could not delete document with id: ")
        res.status(500).json({error: "Internal Server Error"})
        
    }
})



module.exports = i_router;

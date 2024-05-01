const { getDb } = require('../db');
const supply = require('../models/supplierModel');
const express = require('express');
const s_router = express.Router();
const {ObjectId} = require('mongodb')

s_router.post("/", async(req, res) => {
    try {
        let result = await supply.createSupplier(req.body);
        res.status(200).json(result);
    } catch (error) {
        
        console.log("Error creating transactions", error);

        res.status(500).json({error: "Internal Server Error"})
    }
});
s_router.get("/", async (req, res) => {
    const page = req.query.p || 0
    try{
        let result = await supply.getAllSupplier(page);
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});
s_router.get("/:id", async (req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await supply.getOneSupplier(id)
            res.json(result);
        }
        else {
            res.status(400).json({ error: 'Invalid Supplier ID' });
        }
    } catch (error) {
        console.error('Error getting Supplier', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

s_router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await supply.updateSupplier(id, updateFields)
            res.json({ message: 'Transaction updated successfully', result });
        }
        else {
            res.status(400).json({ error: 'Invalid transaction ID' });
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

s_router.delete("/:id", async(req, res) => {
    try {
        const oid = req.params.id
        if (ObjectId.isValid(oid)){
            const result = await supply.deleteSupplier(oid)
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Could not delete document with id: ")
        res.status(500).json({error: "Internal Server Error"})
        
    }
})



module.exports = s_router;

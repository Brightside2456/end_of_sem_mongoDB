const { getDb } = require('../db');
const express = require('express');
const c_router = express.Router();
const {ObjectId} = require('mongodb');
const Customer = require("../models/customerModel");

c_router.post("/", async(req, res) => {
    try {
        let result = await Customer.createProduct(req.body);
        res.status(200).json(result);
    } catch (error) {
        
        console.log("Error inserting Customer", error);

        res.status(500).json({error: "Internal Server Error"})
    }
});
c_router.get("/", async (req, res) => {
    try{
        let result = await Customer.getAllProduct();
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});

c_router.get("/:id", async (req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await Customer.getOneProduct(id)
            res.json(result);
        }
        else {
            res.status(400).json({ error: 'Invalid customer ID' });
        }
    } catch (error) {
        console.error('Error getting customer details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

c_router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await Customer.updateProduct(id, updateFields)
            res.json({ message: 'Customer updated successfully', result });
        }
        else {
            res.status(400).json({ error: 'Invalid Customer ID' });
        }
    } catch (error) {
        console.error('Error updating Customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

c_router.delete("/:id", async(req, res) => {
    try {
        const oid = req.params.id
        if (ObjectId.isValid(oid)){
            const result = await Customer.deleteProduct(oid)
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Could not delete document with id: ")
        res.status(500).json({error: "Internal Server Error"})
        
    }
})



module.exports = c_router;

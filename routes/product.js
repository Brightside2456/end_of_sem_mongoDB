const { getDb } = require('../db');
const product = require('../models/productModel');
const express = require('express');
const p_router = express.Router();
const {ObjectId} = require('mongodb')

p_router.post("/", async(req, res) => {
    try {
        let result = await product.createProduct(req.body);
        res.status(200).json(result);
    } catch (error) {
        
        console.log("Error creating Product", error);

        res.status(500).json({error: "Internal Server Error"})
    }
});
p_router.get("/", async (req, res) => {
    const page = req.query.p
    try{
        let result = await product.getAllProduct(page);
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});
p_router.get("/:id", async (req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await product.getOneProduct(id, updateFields)
            res.json(result);
        }
        else {
            res.status(400).json({ error: 'Invalid product ID' });
        }
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
p_router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await product.updateProduct(id, updateFields)
            res.json({ message: 'Product updated successfully', result });
        }
        else {
            res.status(400).json({ error: 'Invalid transaction ID' });
        }
    } catch (error) {
        console.error('Error updating Product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

p_router.delete("/:id", async(req, res) => {
    try {
        const oid = req.params.id
        if (ObjectId.isValid(oid)){
            const result = await product.deleteProduct(oid)
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Could not delete document with id: ")
        res.status(500).json({error: "Internal Server Error"})
        
    }
})



module.exports = p_router;

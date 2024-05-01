// const { getDb } = require('../db');
const transact = require('../models/transactionModel');
const express = require('express');
const t_router = express.Router();
const {ObjectId} = require('mongodb')



t_router.post("/", async(req, res) => {
    try {
        let result = await transact.createTransaction(req.body);
        res.status(200).json(result);
    } catch (error) {
        
        console.log("Error creating transactions", error);

        res.status(500).json({error: "Internal Server Error"})
    }
});
t_router.get("/", async (req, res) => {
    const page = req.query.p || 0
    // console.log(page)
    try{
        let result = await transact.getAllTrasaction(page);
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});
t_router.get("/:id", async (req, res) => {
    const id = req.params.id
    try{
        if(ObjectId.isValid(id)){
            let result = await transact.getOneTrasaction(id);
            res.status(200).json(result)
        }
        else{
            res.status(400).json({error: "Could not get document"})
        }
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});
//Select 1
//UPdate
t_router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await transact.updateTransaction(id, updateFields)
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

t_router.delete("/:id", async(req, res) => {
    try {
        const oid = req.params.id
        if (ObjectId.isValid(oid)){
            const result = await transact.deleteTransaction(oid)
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Could not delete document with id: ")
        res.status(500).json({error: "Internal Server Error"})
        
    }
})



module.exports = t_router;

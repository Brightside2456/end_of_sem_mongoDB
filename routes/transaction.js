const { getDb } = require('../db');
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
    try{
        let result = await transact.getAllTrasaction();
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
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

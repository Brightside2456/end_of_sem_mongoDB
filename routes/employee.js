const { getDb } = require('../db');
const Employee = require('../models/employeeModel');
const express = require('express');
const e_router = express.Router();
const {ObjectId} = require('mongodb')

e_router.post("/", async(req, res) => {
    try {
        let result = await Employee.createProduct(req.body);
        res.status(200).json(result);
    } catch (error) {
        
        console.log("Error inserting employee", error);

        res.status(500).json({error: "Internal Server Error"})
    }
});
e_router.get("/", async (req, res) => {
    try{
        let result = await Employee.getAllProduct();
        res.status(200).json(result)
    }
    catch(error){
        console.log("Error getting documents", error);
        res.status(500).json({error: "Internal Server Error"})
    }
});
e_router.get("/:id", async (req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await Employee.getOneProduct(id)
            res.json(result);
        }
        else {
            res.status(400).json({ error: 'Invalid employee ID' });
        }
    } catch (error) {
        console.error('Error getting employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

e_router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const updateFields = req.body
    try {
        if(ObjectId.isValid(id)){
            const result = await Employee.updateProduct(id, updateFields)
            res.json({ message: 'employee updated successfully', result });
        }
        else {
            res.status(400).json({ error: 'Invalid employee ID' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

e_router.delete("/:id", async(req, res) => {
    try {
        const oid = req.params.id
        if (ObjectId.isValid(oid)){
            const result = await Employee.deleteProduct(oid)
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Could not delete document with id: ")
        res.status(500).json({error: "Internal Server Error"})
        
    }
})



module.exports = e_router;

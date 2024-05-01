const { Double } = require("mongodb");
const Aggregation = require("../models/aggregation_functions")
const agr_router = require('express').Router()


agr_router.post("/calc/", async(req, res) => {
    console.log("In Here")
    
    const name = req.body.name;
    const quantity = req.body.quantity;

    if(!quantity || !name){
        return res.status(400).json({error: "Quantity and name are required"})

    }
    const pr = await Aggregation.getOneProductByName(name);

    if(!pr){
        return res.status(404).json({error: "Product not found"})
    }

    
    let totalPrice = quantity * pr.unit_price;
    totalPrice = +(totalPrice.toFixed(2))

    res.status(200).json({"Total price": totalPrice});

});

module.exports = agr_router








const { Double } = require("mongodb");
const Aggregation = require("../models/aggregation_functions")
const agr_router = require('express').Router()


agr_router.post("/calc/", async(req, res) => {
    // console.log("In Here")
    
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

agr_router.get('/trans_per_customer', async(req, res) => {
    try {
        let result = await Aggregation.total_trans_per_customerId();
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message  : "Error finding total transactions per customer"})
    }
});

module.exports = agr_router








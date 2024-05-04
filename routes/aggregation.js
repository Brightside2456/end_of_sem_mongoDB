const { Double } = require("mongodb");
const Aggregation = require("../models/aggregation_functions")
const agr_router = require('express').Router()


agr_router.post("/calc", async(req, res) => {
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

agr_router.get('/top_selling', async(req, res) => {
    let i = req.query.num || 5
    i = +(i)
    console.log(i)
    try {
        let result = await Aggregation.getNBestSellingItems(i);
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message  : "Error finding best selling products"})
    }
});

agr_router.post("/transac", async (req, res) => {


    const  products  = req.body;

    const responses = [];
    const errors = [];


    if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Products must be an array" });
    }


    for (const { name, quantity } of products) {
        if (!quantity || !name) {
            errors.push({ name, quantity, error: "Quantity and name are required" });
            continue;
        }

        const pr = await Aggregation.getOneProductByName(name);
        if (!pr) {
            errors.push({ name, quantity, error: "Product not found" });
            continue;
        }

        const totalPrice = quantity * pr.unit_price;
        responses.push({ name, quantity, totalPrice });
    }

    // Calculate total price for successful transactions
    const totalAmount = responses.reduce((total, { totalPrice }) => total + totalPrice, 0);

    const responseObj = {
        successes: responses,
        errors,
        totalAmount
    };

    res.status(200).json(responseObj);
});

agr_router.get('/c_pipes', async (req, res) => {

    try {
        let result = await Aggregation.complex_pipes();

        res.status(200).json(result)
    } catch (error) {
       console.log(error)
       return  res.status(500).json({message  : "Error finding best selling products"})
    }
})




module.exports = agr_router








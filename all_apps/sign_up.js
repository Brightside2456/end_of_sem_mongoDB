const {getDb} = require("../db")
const signUp_router = require("express").Router()
const bcrypt = require('bcrypt')

signUp_router.post("/", async(req, res) => {

    const {username, password, role}= req.body

    try {
        const db = await getDb()
    const loginCollection = db.collection('login')

    //check if employee already exists

    let empExists = await loginCollection.findOne({username: username})
    if (empExists){
        return res.status(409).json({message: "Admin already exists"})
    }

    //else hash the password
    const hashPass = await bcrypt.hash(password, 10);

    newEmp = {
        username,
        password: hashPass,
        role
   
    };  

    

    let result = await loginCollection.insertOne(newEmp);
    if (result){
        res.status(201).json({message: "Employee registered successfully"})
    }
    else{
        res.status(400).json({message: "Employee couldn't be registered successfully"})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }


})


module.exports = signUp_router
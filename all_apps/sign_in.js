const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signin_router = require('express').Router()
const {getDb} = require('../db')


signin_router.post('/', async(req, res) => {
    const {username, password} = req.body

    try {
        const db = await getDb();

        const loginCollection = db.collection('employee')

        let empExists = await loginCollection.findOne({username : username});
        // console.log(empExists)

        if (!empExists){
           return res.status(404). json({message: "User does not exist"})
        }


        let correct_pass = await bcrypt.compare(password, empExists.password);
        
        if (!correct_pass){
            return res.status(404). json({message: "Invalid password"})
        }

        const token = jwt.sign({id: empExists._id, role: empExists.role},  process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }
});

module.exports = signin_router
const { ObjectId } = require('mongodb')
const {getDb} = require('../db')
const jwt = require('jsonwebtoken')
// const auth = require('express').Router()

//Authentication middleware
const authenticate = async (req, res, next) => {
    let token = req.headers['authorization']

   token = token.replace("Bearer ", "")
    // console.log(token)
    if (!token){
        return res.status(401).json({message : "Authentication required"})
    }

    try {
        //This is going to verify and decode the token to get the Id and role appended to it
        const isValidToken = jwt.verify(token, process.env.JWT_SECRET)

        console.log(isValidToken)
        const db = await getDb();
        const employeeCollection = db.collection('employee')

        // console.log(isValidToken.id)
        const employee = await employeeCollection.findOne({_id : new ObjectId(isValidToken.id)})
        // console.log(employee)
        // console.log(employee)
        if(!employee){
            return res.status(404).json({message: "Employee not found"})
        }

        //Attach the employee to the request body
        req.employee = employee

        next();
    } catch (error) {
        console.log("After")
        console.log(error)
        return res.status(403).json({message : "Employee not found"})
    }
}


const authorize = (roles) => {
    return (req, res, next) => {

        let r =  req.employee.role

        if (roles.includes(r)) {
            next();
          } else {
            console.log(r)
            return res.status(403).json({ message: 'Insufficient permissions' });
          }
        
    }
}

module.exports = {authenticate, authorize}
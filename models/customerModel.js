// Customer Models and Function to handle it
const {getDb} = require('../db')

//Defining Schema for customer collection
const customerSchema = {
        _id: { type: String, required: true },
        customer_id: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        phone_number: { type: String },
        purchase_history: { type: Array }    
}
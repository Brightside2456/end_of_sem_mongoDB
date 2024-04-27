// Customer Models and Function to handle it
const { getDb } = require("../db");
const {ObjectId} = require('mongodb')


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


const  Customer = {
        // Create One Supplier
    async createProduct(customerData){
            try {
    
                    const db = await getDb()
                    console.log(db);
                    const result = await db.collection("customer").insertOne(customerData);
                    return result
    
    
            } catch (error) {
                    console.log(error)
                    throw new Error("Error creating customer")
            }
    },
    async getAllProduct(){
        try {
                const db = await getDb()
                const result = await db.collection("customer").find().toArray()
                return result
    
        } catch (error) {
                console.log(error)
                throw new Error("Error getting all customer")
        }
    },
    async getOneProduct(id){
        try {
                const db = await getDb()
                const result = await db.collection("customer").findOne({_id: new ObjectId(id)})
                return result
    
        } catch (error) {
                console.log(error)
                throw new Error("Error getting all customer")
        }
    },
    async updateProduct(objectId, updateFields){
        try {
                const db = await getDb();
                result = await db.collection("customer").updateOne({_id : new ObjectId(objectId)}, {$set : updateFields});
                return result
    
        } catch (error) {
                console.log("Could not update document", error)
                throw new Error("Error updating customer")
        }
    },
    async deleteProduct(objectId){
        try {
                const db = await getDb()
                const result = await db.collection("customer").deleteOne({_id : new ObjectId(objectId)})
                return result
        } catch (error) {
                console.log(error);
                throw new Error("Error deleting customer of id: ", objectId)
        }
    
    }
    
    }
    
    module.exports = Customer
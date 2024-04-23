// Schema for transaction collection

const { getDb } = require("../db");
const {ObjectId} = require('mongodb')


const transactionSchema = {
    _id : {type: String, required: true},
    transation_id : {type: String, required: true},
    customer_id : {type: String, required: true},
    products_sold : {type: Array},
    transaction_date: {type: Date},
    total_amt : {type: Number}
}

const  Transaction = {
        // Create One Transaction
    async createTransaction(transactionData){
            try {

                    const db = await getDb()
                    console.log(db);
                    const result =  db.collection("transaction").insertOne(transactionData);
                    return result


            } catch (error) {
                    console.log(error)
                    throw new Error("Error creating transaction")
            }
    },
    async getAllTrasaction(){
        try {
                const db = await getDb()
                const result = db.collection("transaction").find().toArray()
                return result

        } catch (error) {
                console.log(error)
                throw new Error("Error getting all Transaction")
        }
    },
    async deleteTransaction(objectId){
        try {
                const db = await getDb()
                const result = db.collection("transaction").deleteOne({_id : new ObjectId(objectId)})
                return result
        } catch (error) {
                console.log(error);
                throw new Error("Error deleting transaction of id: ", objectId)
        }

    }

}

module.exports = Transaction
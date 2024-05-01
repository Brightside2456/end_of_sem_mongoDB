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
                    const result = await db.collection("transaction").insertOne(transactionData);
                    return result


            } catch (error) {
                    console.log(error)
                    throw new Error("Error creating transaction")
            }
    },
    async getAllTrasaction(page){
        const itemsPerPage = 5
        try {
                const db = await getDb()
                const result = await db.collection("transaction").find()
                .skip(page * itemsPerPage)
                .limit(itemsPerPage)
                .toArray()

                return result

        } catch (error) {
                console.log(error)
                throw new Error("Error getting all Transaction")
        }
    },
    async getOneTrasaction(id){
        try {
                const db = await getDb()
                const result = await db.collection("transaction").findOne({_id: new ObjectId(id)})
                return result

        } catch (error) {
                console.log(error)
                throw new Error("Error getting all Transaction")
        }
    },
    async updateTransaction(objectId, updateFields){
        try {
                const db = await getDb();
                result = await db.collection("transaction").updateOne({_id : new ObjectId(objectId)}, {$set : updateFields});
                return result

        } catch (error) {
                console.log("Could not update document", error)
                throw new Error("Error updating Transaction")
        }
    },
    async deleteTransaction(objectId){
        try {
                const db = await getDb()
                const result = await db.collection("transaction").deleteOne({_id : new ObjectId(objectId)})
                return result
        } catch (error) {
                console.log(error);
                throw new Error("Error deleting transaction of id: ", objectId)
        }

    }

}

module.exports = Transaction
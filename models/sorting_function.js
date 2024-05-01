const { getDb } = require("../db");
const {ObjectId} = require('mongodb')

const Sort = {
    async sortByTime() {
        try {
            const db = await getDb();
            const collection = db.collection('transaction');

            const result = await collection.find().sort({ transaction_date: 1 }).toArray();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Error sorting collection");
        }
    },

    async sortByAmount() {
        try {
            const db = await getDb();
            // const collection =;
            let tcts = db.collection("transaction")
            const result = await tcts.find({}).sort({ total_amount: 1 }).toArray();
            console.log(result)
            return result;

        } catch (error) {
            console.error(error);
            throw new Error("Error sorting collection");
        }
    }
}


module.exports = Sort;

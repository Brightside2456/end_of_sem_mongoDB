const {ObjectId} = require('mongodb')
const {getDb} = require('../db')

const Aggregation = {
    async getOneProductByName(name){
        try {
    
                const db = await getDb()
                const result = await db.collection("product").findOne({name: name})
                console.log(result)
                return result
    
        } catch (error) {
                console.log(error)
                throw new Error("Error getting product")
        }
    }
}

module.exports = Aggregation
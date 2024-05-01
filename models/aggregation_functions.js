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
    },

    async total_trans_per_customerId(){
        const aggr = [
            {
              '$group': {
                '_id': '$customer_id', 
                'total_transactions_made': {
                  '$first': {
                    '$sum': 1
                  }
                }
              }
            }
          ]
          try {
            const db = getDb();
            const result = await db.collection('transaction').aggregate(aggr).toArray()
            console.log(result)
            return result
          } catch (error) {
            console.log(error)
            throw new Error("Error finding total transactions per customer")
          }
    }
}

module.exports = Aggregation
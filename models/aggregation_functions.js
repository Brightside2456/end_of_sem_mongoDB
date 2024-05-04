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
    },
    async getNBestSellingItems(num){
        const aggr = [
                {
                  '$unwind': {
                    'path': '$products_sold'
                  }
                }, {
                  '$lookup': {
                    'from': 'product', 
                    'localField': 'products_sold.id', 
                    'foreignField': 'product_id', 
                    'as': 'r'
                  }
                }, {
                  '$group': {
                    '_id': '$r.product_id', 
                    'product_name': {
                      '$first': '$r.name'
                    }, 
                    'quantity_sold': {
                      '$sum': '$products_sold.quantity'
                    }
                  }
                }, {
                  '$sort': {
                    'quantity_sold': -1
                  }
                }, {
                  '$limit': num
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
    },
    async complex_pipes(){
      const aggr = [
        {
          '$lookup': {
            'from': 'product', 
            'localField': 'product_id', 
            'foreignField': '_id', 
            'as': 'r'
          }
        }, {
          '$lookup': {
            'from': 'supplier', 
            'localField': 'supplier_id', 
            'foreignField': '_id', 
            'as': 'l2'
          }
        }, {
          '$group': {
            '_id': '$_id', 
            'product_name': {
              '$first': '$r.name'
            }, 
            'product_category': {
              '$first': '$r.category'
            }, 
            'brand': {
              '$first': '$r.brand'
            }, 
            'unit_price': {
              '$first': '$r.unit_price'
            }, 
            'supplier_name': {
              '$first': '$l2.company_name'
            }, 
            'email': {
              '$first': '$l2.contact_info.email'
            }, 
            'phone_number': {
              '$first': '$l2.contact_info.phone_number'
            }
          }
        }, {
          '$unwind': {
            'path': '$product_name'
          }
        }, {
          '$unwind': {
            'path': '$product_category'
          }
        }, {
          '$unwind': {
            'path': '$brand'
          }
        }, {
          '$unwind': {
            'path': '$unit_price'
          }
        }, {
          '$unwind': {
            'path': '$supplier_name'
          }
        }, {
          '$unwind': {
            'path': '$email'
          }
        }, {
          '$unwind': {
            'path': '$phone_number'
          }
        }
      ];

      try {
        const db = getDb();
        const result = await db.collection('inventory').aggregate(aggr).toArray()
        console.log(result)
        return result
      } catch (error) {
        console.log(error)
        throw new Error("Eperoforming complex pipes")
      }
    }
}

module.exports = Aggregation
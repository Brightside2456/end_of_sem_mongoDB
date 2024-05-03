from pymongo import MongoClient

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient('mongodb://localhost:27017/')
result = client['test']['inventory'].aggregate([
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
])

j = 0
for i in result:
    j+=1
    print(i)

print(j)
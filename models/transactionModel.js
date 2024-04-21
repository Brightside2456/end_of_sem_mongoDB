// Schema for transaction collection


const transactionSchema = {
    _id : {type: String, required: true},
    transation_id : {type: String, required: true},
    customer_id : {type: String, required: true},
    products_sold : {type: Array},
    transaction_date: {type: Date},
    total_amt : {type: Number}
}
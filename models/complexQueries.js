const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const ComplexQueries = {
   //finding  the total amount greater than the specified amount
    async findTransactionsWithTotalAmountGreaterThan(amount) {
        try {
            const db = await getDb();
            const transactionsCollection = db.collection('transaction');

            const transactions = await transactionsCollection.aggregate([
                {
                    $match: {
                        total_amount: { $gt: amount }
                    }
                },
                {
                    $lookup: {
                        from: 'product',
                        localField: 'products_sold.id',
                        foreignField: 'product_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        transaction_id: 1,
                        customer_id: 1,
                        transaction_date: 1,
                        total_amount: 1,
                        product: 1
                    }
                }
            ]).toArray();

            return transactions;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving transactions");
        }
    }, 
    async findProductsByNameKeyword(keyword) {
        try {
            const db = await getDb();
            const productsCollection = db.collection('product');

            const products = await productsCollection.find({
                name: { $regex: keyword, $options: 'i' }
            }).toArray();

            return products;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving products");
        }
    }
};

module.exports = ComplexQueries;

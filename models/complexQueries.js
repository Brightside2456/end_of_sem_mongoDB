const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const ComplexQueries = {
    async findProductsByCategoryAndPriceRange(product_id, price) {
        try {
            const db = await getDb();
            const productsCollection = db.collection('product');

            const products = await productsCollection.aggregate([
                {
                    $match: {
                        product_id: product_id,
                        price: { $lt: price },
                        quantity: { $gt: 0 }
                    }
                },
               
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        price: 1,
                        quantity: 1,
                        transactions: 1
                    }
                }
            ]).toArray();

            return products;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving products");
        }
    }
};

module.exports = ComplexQueries;

const { getDb } = require("../db");
const {ObjectId} = require('mongodb')

const ProductSchema = {
    _id: { type: String, required: true },
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    brand: { type: String }
};

const  Product = {
    // Create One Supplier
async createProduct(productData){
        try {

                const db = await getDb()
                console.log(db);
                const result = await db.collection("product").insertOne(productData);
                return result


        } catch (error) {
                console.log(error)
                throw new Error("Error creating transaction")
        }
},
async getAllProduct(page){
        const itemsPerPage = 5
    try {
            const db = await getDb()
            const result = await db.collection("product").find()
            .skip(page * itemsPerPage)
            .limit(itemsPerPage)
            .toArray()
            return result

    } catch (error) {
            console.log(error)
            throw new Error("Error getting all Transaction")
    }
},
async getOneProduct(id){
        try {
                const db = await getDb()
                const result = await db.collection("product").findOne({_id: new ObjectId(id)})
                return result

        } catch (error) {
                console.log(error)
                throw new Error("Error getting product")
        }
    },
async updateProduct(objectId, updateFields){
    try {
            const db = await getDb();
            result = await db.collection("product").updateOne({_id : new ObjectId(objectId)}, {$set : updateFields});
            return result

    } catch (error) {
            console.log("Could not update document", error)
            throw new Error("Error updating Transaction")
    }
},
async deleteProduct(objectId){
    try {
            const db = await getDb()
            const result = await db.collection("product").deleteOne({_id : new ObjectId(objectId)})
            return result
    } catch (error) {
            console.log(error);
            throw new Error("Error deleting transaction of id: ", objectId)
    }

}

}

module.exports = Product
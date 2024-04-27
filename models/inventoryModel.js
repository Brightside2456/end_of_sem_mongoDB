const { getDb } = require("../db");
const {ObjectId} = require('mongodb')

const InventorySchema = {
    _id: { type: String, required: true },
    inventory_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    supplier_id: { type: String, required: true },
    dimensions: { type: String },
    weight: { type: Number }
};

const  Inventory = {
    // Create One Supplier
async createProduct(inventoryData){
        try {

                const db = await getDb()
                console.log(db);
                const result = await db.collection("inventory").insertOne(inventoryData);
                return result


        } catch (error) {
                console.log(error)
                throw new Error("Error creating transaction")
        }
},
async getAllProduct(){
    try {
            const db = await getDb()
            const result = await db.collection("inventory").find().toArray()
            return result

    } catch (error) {
            console.log(error)
            throw new Error("Error getting all Transaction")
    }
},
async getOneProduct(id){
        try {
                const db = await getDb()
                const result = await db.collection("inventory").findOne({_id: new ObjectId(id)})
                return result
    
        } catch (error) {
                console.log(error)
                throw new Error("Error getting Inventory details")
        }
    },
async updateProduct(objectId, updateFields){
    try {
            const db = await getDb();
            result = await db.collection("inventory").updateOne({_id : new ObjectId(objectId)}, {$set : updateFields});
            return result

    } catch (error) {
            console.log("Could not update document", error)
            throw new Error("Error updating Transaction")
    }
},
async deleteProduct(objectId){
    try {
            const db = await getDb()
            const result = await db.collection("inventory").deleteOne({_id : new ObjectId(objectId)})
            return result
    } catch (error) {
            console.log(error);
            throw new Error("Error deleting transaction of id: ", objectId)
    }

}

}

module.exports = Inventory
const { getDb } = require("../db");
const {ObjectId} = require('mongodb')

const SupplierSchema = {
    _id: { type: String, required: true },
    supplier_id: { type: String, required: true },
    company_name: { type: String, required: true },
    contact_info: {
        email: { type: String },
        phone_number: { type: String }
    }
};


const  Supplier = {
    // Create One Supplier
async createSupplier(supplierData){
        try {

                const db = await getDb()
                console.log(db);
                const result = await db.collection("supplier").insertOne(supplierData);
                return result


        } catch (error) {
                console.log(error)
                throw new Error("Error creating transaction")
        }
},
async getAllSupplier(){
    try {
            const db = await getDb()
            const result = await db.collection("supplier").find().toArray()
            return result

    } catch (error) {
            console.log(error)
            throw new Error("Error getting all Transaction")
    }
},
async getOneSupplier(id){
        try {
                const db = await getDb()
                const result = await db.collection("supplier").findOne({_id: new ObjectId(id)})
                return result

        } catch (error) {
                console.log(error)
                throw new Error("Error getting Supplier")
        }
    },
async updateSupplier(objectId, updateFields){
    try {
            const db = await getDb();
            result = await db.collection("supplier").updateOne({_id : new ObjectId(objectId)}, {$set : updateFields});
            return result

    } catch (error) {
            console.log("Could not update document", error)
            throw new Error("Error updating Transaction")
    }
},
async deleteSupplier(objectId){
    try {
            const db = await getDb()
            const result = await db.collection("supplier").deleteOne({_id : new ObjectId(objectId)})
            return result
    } catch (error) {
            console.log(error);
            throw new Error("Error deleting transaction of id: ", objectId)
    }

}

}

module.exports = Supplier
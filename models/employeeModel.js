const { getDb } = require("../db");
const {ObjectId} = require('mongodb')

const EmployeeSchema = {
    _id: { type: String, required: true },
    employee_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    role: { type: String, required: true },
    contact_info: {
        email: { type: String, required: true },
        phone_number: { type: String },
    },
    work_schedule: { type: String }
};


const  Employee = {
    // Create One Supplier
async createProduct(employeeData){
        try {

                const db = await getDb()
                console.log(db);
                const result = await db.collection("employee").insertOne(employeeData);
                return result


        } catch (error) {
                console.log(error)
                throw new Error("Error creating employee")
        }
},
async getAllProduct(page){
        let itemsPerPage = 5
    try {
            const db = await getDb()
            const result = await db.collection("employee").find()
            .skip(page * itemsPerPage)
            .limit(itemsPerPage)
            .toArray()
            return result

    } catch (error) {
            console.log(error)
            throw new Error("Error getting all employees")
    }
},
async getOneProduct(id){
        try {
                const db = await getDb()
                const result = await db.collection("employee").findOne({_id: new ObjectId(id)})
                return result
    
        } catch (error) {
                console.log(error)
                throw new Error("Error getting employees")
        }
    },
async updateProduct(objectId, updateFields){
    try {
            const db = await getDb();
            result = await db.collection("employee").updateOne({_id : new ObjectId(objectId)}, {$set : updateFields});
            return result

    } catch (error) {
            console.log("Could not update document", error)
            throw new Error("Error updating employee")
    }
},
async deleteProduct(objectId){
    try {
            const db = await getDb()
            const result = await db.collection("employee").deleteOne({_id : new ObjectId(objectId)})
            return result
    } catch (error) {
            console.log(error);
            throw new Error("Error deleting employee of id: ", objectId)
    }

}

}

module.exports = Employee
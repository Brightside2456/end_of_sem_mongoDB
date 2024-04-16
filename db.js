/*
We can use an instance of MongoClient to connect to
a cluster, access the database in that cluster,
and close the connection to that cluster.
*/
const  {MongoClient} = require('mongodb')
require('dotenv').config()

// console.log(process.env.DB_URI); // This will output the value of the DB_URI key in the .env file
let client;

/*We create an asynchronous function named main() 
where we will connect to our MongoDB cluster,
 call functions that query our database,
  and disconnect from our cluster.
*/

/**
* Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
* See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
*/
// const uri = process.env.DB_URI     
async function main(){
    try {

        client = new MongoClient(process.env.DB_URI);

        await listDatabases(client); 

        const db = client.db("local");

        return db;

    } catch (error) {
        console.error(error)
    } finally {
         client.close()
    }

    async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
    
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };
}


module.exports = main

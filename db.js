/*
We can use an instance of MongoClient to connect to
a cluster, access the database in that cluster,
and close the connection to that cluster.
*/
const  {MongoClient} = require('mongodb')
require('dotenv').config()

const dbName = "CartCentral"

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(process.env.DB_URI)
        .then((client) => {
            dbConnection = client.db(dbName)
            return cb()
        }).catch((err) => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}


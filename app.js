const express = require('express')

const {connectToDb, getDb} = require('./db')
const {ObjectId} = require('mongodb')

const app = express()

app.use(express.json())

connectToDb((err) => {
    if (!err){
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
        db = getDb()
    }
})


// app.get('/', (req, res) => {
//     db.showCollection().toArray()
//     .then(col => {
//         res.status(200).json(books)
//     })
//     .catch((e) => {
//         console.log(e)
//         res.status(500).json({error: "Could Not list collections"})
//     })
// })

// route to list all collections
app.get('/list_collections', async (req, res) => {
    try {
        const database = await db; // Connect to the database
        const collections = await database.listCollections().toArray(); // Retrieve collections

        let collectionNames = collections.map(collection => collection.name);
        res.json({ collections: collectionNames }); // Send the collection names as JSON response
    } catch (error) {
        console.error('Error listing collections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


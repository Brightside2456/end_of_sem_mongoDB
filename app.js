const express = require('express')
const bcrypt = require('bcrypt')

const {connectToDb, getDb} = require('./db')
const {ObjectId} = require('mongodb')
const t_router = require('./routes/transaction')
const s_router = require('./routes/supplier')
const p_router = require('./routes/product')
const i_router = require('./routes/inventory')
const e_router = require('./routes/employee')
const c_router = require('./routes/customer')
const sort_router = require('./routes/sorting')
const su_router = require("./all_apps/sign_up")
const agr_router = require('./routes/aggregation')
const bw_router = require('./routes/bulkWrite')
const complex_router = require('./routes/complexQueries')
const si_router = require('./all_apps/sign_in')
let db = require('./db')
const app = express()

app.use(express.json())

// app.set('view engine', 'ejs');

connectToDb((err) => {
    if (!err){
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        }
        
    )
        db = getDb()
    }

    else console.log(err);
})

// app.get('/', (req, res) => {
//     res.render('index', {title: "Login System"})
// })

app.use('/sign_up', su_router);


app.use('/sign_in', si_router);

app.use("/trans", t_router);

//supplier middleware
app.use('/sup', s_router);

//Product MiddleWare
app.use('/prod', p_router);

//Inventory middleware
app.use("/invent", i_router);

//Employee middleware
app.use("/emp", e_router);

//Customer middleware
app.use("/customer", c_router);

app.use("/aggr", agr_router);
//bulkwrite middlewaare
app.use("/bw", bw_router);

app.use("/sort", sort_router);

app.use("/complex", complex_router)




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

// app.get('/transaction', (req, res) => {
//      let trans = [] db.collection("transaction").find() .forEach(tran => trans.push(tran)) .then(() => { res.status(200).json(trans) console.log(trans) }) .catch(() =>{ res.status(500).json({error: "could not fetch the documents"}) }) })

// cursor and fetching
app.get('/transaction', (req, res) => {
    let trans = []
    db.collection('transaction').find()
    .forEach(tran => trans.push(tran))
    .then(() => {res.status(200).json(trans)

        console.log(trans)
    })
    .catch(() => res.status(500)
    .json({error: "could not fetch the documents"})
)
})
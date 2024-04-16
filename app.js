const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')
const app = express();


app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data


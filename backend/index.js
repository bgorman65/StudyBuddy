// Code to start the server and connect to the database
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
require('dotenv').config();


// Create an instance of express
const app = express();


// Use body parser to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Use cors to allow cross origin requests
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}


// Use the router for all routes
app.use(cors(corsOptions));
app.use("/" , router);


// Options for the database connection
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


// Connect to the database
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log("Connection failed", err);
});


// Start the server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
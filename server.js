require('dotenv').config()
const express = require("express");
const cors = require("cors")
const axios = require("axios")
// Declare a variable or static port number
const PORT = process.env.PORT || 3001;
// Instantiate the Express server and set its parameters
// Note - parameters can possibly be declared on a single line, but separated out for human readibility
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, function() {
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});


app.get('/', (req, res) => {res.json("Hello World")});
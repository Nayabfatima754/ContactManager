const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const db = require('./db'); 

const port = process.env.PORT || 3000;

const contact_routes = require('./routes/contact_routes'); // Ensure the path is correct
const user_routes = require('./routes/user_routes'); // Ensure the path is correct

const errorHandler = require("./middleware/errorHandler")

app.use(express.json())

app.use('/api/contacts', contact_routes); // Use the imported routes
app.use('/api/users', user_routes); // Use the imported routes

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

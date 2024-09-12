const express = require('express');
const Router = express.Router(); // Correctly create a Router instance
const asyncHandler = require('express-async-handler');


const { getContacts, 
  postContacts, 
  getContact, 
  putContacts, 
  deleteContacts } = require('../Controllers/contact_controller');
const jwtAuthMiddleware = require('../jwt');
  Router.use(jwtAuthMiddleware)

// Define routes
Router.get('/', getContacts);

Router.post('/', postContacts);

Router.get('/:id', getContact);

Router.put('/:id', putContacts);

Router.delete('/:id', deleteContacts);

module.exports = Router; // Export the correct Router instance

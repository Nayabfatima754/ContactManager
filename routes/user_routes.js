const express = require('express');
const Router = express.Router(); // Correctly create a Router instance
const {registerUser,loginUser,currentUser} = require('../Controllers/user_controller')
const jwtAuthMiddleware = require('../jwt')

Router.post('/register',registerUser )



Router.post("/login",loginUser)



Router.get("/current",jwtAuthMiddleware,currentUser)



























module.exports = Router; // Export the correct Router instance

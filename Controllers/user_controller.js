const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        // Check if the user already exists
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            return res.status(400).json({ message: 'This email is already registered' });
        }

        // Create hashed password
        const hashedPassword = await bcrypt.hash(password, 10); // password and salt
        console.log('Hashed Password:', hashedPassword);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Respond with the created user (excluding the password for security)
        if (newUser) {
            return res.status(201).json({ _id: newUser._id, email: newUser.email });
        } else {
            return res.status(400).json({ message: 'User data is not valid' });
        }

    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    username: user.username,
                },
            },
            process.env.JWT_SECRET, // Ensure you have this environment variable set
            { expiresIn: '30m' } // Token expiration time
        );

        // Respond with the token
        return res.json({ accessToken });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc Get current user
// @route GET /api/users/me
// @access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user information' });
});

module.exports = { registerUser, loginUser, currentUser };

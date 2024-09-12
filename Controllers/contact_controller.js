const asyncHandler = require('express-async-handler');
const Contact = require('./../models/contact.js');
const mongoose = require('mongoose');

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id }); // to get contacts for the particular user
    res.status(200).json(contacts);
});

// @desc Create a contact
// @route POST /api/contacts
// @access Private
const postContacts = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !mobile) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        // Create and save the new contact
        const contact = await Contact.create({
            user_id: req.user.id, // Associate the contact with the logged-in user
            name,
            email,
            mobile,
        });

        return res.status(201).json(contact);

    } catch (err) {
        console.error('Error adding contact:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc Get a specific contact by ID
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
    const contactID = req.params.id;

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(contactID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Fetch the contact by ID and ensure it belongs to the authenticated user
        const contact = await Contact.findOne({ _id: contactID, user_id: req.user.id });

        // Check if contact was found
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        // Return the contact if found
        return res.status(200).json(contact);
    } catch (err) {
        console.error('Error fetching contact:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Update a specific contact by ID
// @route PUT /api/contacts/:id
// @access Private
const putContacts = asyncHandler(async (req, res) => {
    const contactID = req.params.id;

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(contactID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Fetch the contact by ID and ensure it belongs to the authenticated user
        let contact = await Contact.findOne({ _id: contactID, user_id: req.user.id });

        // Check if contact was found
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        // Update the contact with new data
        contact = await Contact.findByIdAndUpdate(contactID, req.body, {
            new: true,
        });

        return res.status(200).json(contact);
    } catch (err) {
        console.error('Error updating contact:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Delete a specific contact by ID
// @route DELETE /api/contacts/:id
// @access Private
const deleteContacts = asyncHandler(async (req, res) => {
    const contactID = req.params.id;

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(contactID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Fetch the contact by ID and ensure it belongs to the authenticated user
        const contact = await Contact.findOne({ _id: contactID, user_id: req.user.id });

        // Check if contact was found
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        // Delete the contact
        await Contact.findByIdAndDelete(contactID);

        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { getContacts, postContacts, getContact, putContacts, deleteContacts };

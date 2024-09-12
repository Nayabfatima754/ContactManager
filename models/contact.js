const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,// to store or fetch contacts of particular user 
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
  },

  mobile:{
    type:Number,
    required:true
  }
  
});


const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

const mongoose = require('mongoose');

// Define a schema for the 'Contact' model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // 'name' field is required
    },
    phone: {
        type: String,
        required: true // 'phone' field is required
    }
});

// Create a model or collection named 'Contact' using the defined schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the 'Contact' model or collection so it can be used in other files
module.exports = Contact;

// Import mongoose
const mongoose = require('mongoose');


// Create the Schema

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        dateUpdated: {
            type: Date,
            default: Date.now
        }
    }
);
// Create the Model 
const UserModel = mongoose.model("users", UserSchema);

// Export the Model
module.exports = UserModel;
// Import mongoose
const mongoose = require('mongoose');


// Create the Schema

const UserUpdateSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: false
        },
        avatar: {
            type: String,
            required: false
        },
        about: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        education: {
            universityName: {type: String, required: false},
            degreeType: {type: String, required: false},
            graduationYear: {type: String, required: false},
            required: false
        },
        experience: {
            type: String,
            required: false
        },
        rates: {
            type: Number,
            required: false
        },
        skills: {
            type: String,
            required: false
        },
        linkedin: {
            type: String,
            required: false
        },
        github: {
            type: String,
            required: false
        },
        dateUpdated: {
            type: Date,
            default: Date.now
        }
    }
);
// Create the Model 
const UserUpdateModel = mongoose.model("updated users", UserUpdateSchema);

// Export the Model
module.exports = UserUpdateModel;
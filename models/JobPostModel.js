// Import mongoose
const mongoose = require('mongoose');


// Create the Schema

const JobPostSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        jobDescription: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        skillRequired: {
            type: String,
            required: false
        },
        timeline: {
            type: String,
            required: true
        },
        budget: {
            type: String,
            required: true
        },
        screeningQuestion: {
            type: String,
            required: false
        }
    }
)
// Create the Model 
const jobPostModel = mongoose.model("jobs", JobPostSchema);

// Export the Model
module.exports = jobPostModel;
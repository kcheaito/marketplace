// Import the express function
const express = require('express'); 
// Import mongoose to allow connection to database
const mongoose = require('mongoose');
// Import cors for express to accept and send external data
const cors = require('cors');
// Dotenv for reading environment variables 
require('dotenv').config();
// Import cloudinary 
const cloudinary = require('cloudinary').v2;
// Import express-form-data
const expressFormData = require('express-form-data');
// Call the express function
const server = express();

// Import user routes
const userRoutes = require('./routes/user-routes.js');
// Import job post routes
const jobPostRoutes = require('./routes/jobPost-routes.js');
// Import update user routes
const userUpdateRoutes = require('./routes/user-update-routes.js');

// Connect to MongoDB using mongoose
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(connectionString, connectionConfig).then(
    function() {
        console.log("DB is connected");
    }
)
.catch(
    function(dbError) {
        console.log("error occured", dbError)
    }
);

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration for Express
// Configure for POST request
server.use(express.urlencoded({ extended: false }) );
// Configure for JSON format
server.use(express.json());
// Configure for CORS 
server.use(cors());
// Configure for form data
server.use(expressFormData.parse());
// Configure for different routes
// Configure for users route
server.use('/users', userRoutes);
// Configure for job post route
server.use('/jobs', jobPostRoutes);
// Configure for users update route
server.use('/users', userUpdateRoutes);

// A GET route
server.get(
    '/', // document
    function (req, res) { //callback function
        res.send("<h1>Welcome Home</h1>");
    }
);

server.listen(
    process.env.PORT || 3001,
    function() {
        console.log('Server running on http://localhost:3001/')
    }
);
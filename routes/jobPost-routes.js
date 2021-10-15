const express = require('express');
const router = express.Router();
const JobPostModel = require('../models/JobPostModel');

router.post(
    '/create',            // http://localhost:3001/jobs/create
    function(req, res) {
        

        const formData = {
            jobTitle: req.body.jobTitle,
            location: req.body.location,
            jobDescription: req.body.jobDescription,
            category: req.body.category,
            skillsRequired: req.body.skillsRequired,
            timeline: req.body.timeline,
            budget: req.body.budget,
            screeningQuestion: req.body.screeningQuestion
        };

        JobPostModel
        .create(formData)
        .then(
            function(dbDocument) {
                res.send(dbDocument);
            }
        )
        .catch(
            function(mongooseError) {
                console.log(mongooseError)
                res.send("Error occured. Check the shell.");
            }
        )

    }
);

module.exports = router;
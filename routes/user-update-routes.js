const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const UserUpdateModel = require('../models/UserUpdateModel.js');
const cloudinary = require('cloudinary').v2;

router.post(
    '/update',            // http://localhost:3001/users/update
    function(req, res) {

        const formData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role: req.body.role,
            country: req.body.country,
            about: req.body.about,
            education: req.body.education,
            experience: req.body.experience,
            rates: req.body.rates,
            skills: req.body.skills,
            linkedin: req.body.linkedin,
            github: req.body.github
        };

        // 1. Check if email & phone number are unique
        UserUpdateModel
        .findOne({$or: 
            [
            {email: formData.email},
            {phone: formData.phone}
        ]})
        .then(
            async function(dbDocument) {
                // 2. If email or phone number exists, reject the request
                if(dbDocument) {
                    res.send("Entered email address and/or phone number already exist!");
                }
                // 3. If email & phone do not exist, proceed 
                else {
                    // upload their picture if provided
                    if( Object.values(req.files).length > 0){
                        const filePath = Object.values(req.files)[0].path;
                    await cloudinary.uploader.upload(
                        filePath,
                        function(cloudinaryErr, cloudinaryResult){
                            if(cloudinaryErr){
                                console.log(cloudinaryErr);
                                res.json({message: "Error uploading image"});
                            }
                            else {
                                formData.avatar = cloudinaryResult.url;
                            }

                        }
                    );
                    }

                    // 4.1. Generate the salt
                    bcryptjs.genSalt(
                        function(err, theSalt) {
                            
                            // 4.2. With the salt and password, hash the password
                            bcryptjs.hash(
                                formData.password,
                                theSalt,
                                function(err, theHash) {
                                    // 5. Reassign the original password with the hash
                                    formData.password = theHash;

                                    // 6. Save document to the database
                                    UserUpdateModel
                                    .create(formData)
                                    .then(
                                        function(dbDocument) {
                                            res.json(dbDocument);
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
                        }
                    );
                }
            }
        )
        .catch(
            function(mongooseError) {
                console.log(mongooseError);
                res.send(mongooseError);
            }
        )
    
    }
);

module.exports = router;

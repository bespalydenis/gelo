const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    console.log('>> i');

    const { errors, isValid } = validateRegisterInput(req.body);
    //
    // // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    console.log('>> i');


    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                level: req.body.level,
                access: req.body.access,
                parent: req.body.parent,
                rights: req.body.rights
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/newUnit', (req, res) => {

});

// REMOVE
router.post('/remove', (req, res) => {
    const query = { email: req.body.email };
    User.deleteOne(query, function (err, obj) {
        if(err) throw err;
        console.log('1 doc deleted', req);
    })
});


// GET from DB
router.post('/units', (req, res) => {
    console.log('>>>> Units was found!', req.body.userID);
    User.find({ 'parent': req.body.userID }).then(units => res.json(units));
});



// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ 'email': email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                const token = jwt.sign({
                    id: user.id,
                    username: user.name,
                    email: user.email
                }, keys.secretOrKey);

                res.json({
                    success: true,
                    token,
                    userID: user.id
                });
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        }).catch(err => console.log('iv',err, password));
    });
});


module.exports = router;
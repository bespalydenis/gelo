const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const nodemailer = require('nodemailer');
const md5 = require('md5');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const ObjectID = require('mongodb').ObjectID;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'bestweb2018@gmail.com',
        pass: 'slash2018'
    },
    tls: {
        rejectUnauthorized: false
    },
});

// Load User model
const User = require("../../models/user");

// @route POST api/users/register
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.json({ errors: { email: "Email already exists" } });
        } else {
            const token = jwt.sign({
                email: req.body.email,
                date: new Date().toISOString()
            }, keys.secretOrKey);

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                level: req.body.level,
                access: req.body.access,
                parent: req.body.parent,
                rights: req.body.rights,
                secret: token
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

            let HelperOptions = {
                from: `"Denys" <${req.body.email}`,
                to: newUser.email,
                subject: 'Email Confirmation',
                text: req.body.isGoogleAuth ? `Go to the: http://localhost:3000/confirmation/${token}. Your password: ${req.body.password}` : `Go to the: http://localhost:3000/confirmation/${token}.`
            };

            transporter.sendMail(HelperOptions, (error, info) => {
               if (error) {
                   return console.log('>> Smth went wrong!', error);
               }
               console.log('>> The message was sent!', info)
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


// Secret
router.post('/secret', (req, res) => {
    User.findOne({'email': req.body.email}).then( result => {
        res.json(result.secret);
    } );
});


// User Data
router.post('/user', (req, res) => {
    User.findOne({
        "_id": ObjectID(req.body.id)
    }, {
        password: 0
    }).then( result => {
        console.log('>> /user', result);
        res.json(result)
    } );
});

// Update User Status
router.post('/updateStatus', (req, res) => {
    User.updateOne({"_id": ObjectID(req.body.id)}, { $set:{"status": req.body.status} }).then(result => { console.log('>> Status Updated'); res.json(result); });
});


// completeStep1
router.post('/completeStep1', (req, res) => {
    const meta = req.body.meta;
    console.log('>> ID:', req.body.id);
    User.updateOne({"_id": ObjectID(req.body.id)}, { $set:{
        "profilePhoto": meta.profilePhoto,
        "organizationTitle": meta.organizationTitle,
        "country": meta.country,
        "city": meta.city,
        "zip": meta.zip,
        "address": meta.address,
        "phoneNumber1": meta.phoneNumber1,
        "phoneNumber2": meta.phoneNumber2,
        "website": meta.website,
        "accountDesc": meta.accountDesc,
        "status": 2
    } }).then(result => { console.log('>> Step 1 SUCCESS!', result); res.json(true) })
});

// completeStep2
router.post('/completeStep2', (req, res) => {
    const meta = req.body.meta;
    console.log('>> unitSystem:', req.body.meta.unitSystem);
    User.updateOne({"_id": ObjectID(req.body.id)}, { $set:{
            "language": meta.language,
            "unitSystem": meta.unitSystem,
            "currency": meta.currency,
            "status": 3
        } }).then(result => { console.log('>> Step 2 SUCCESS!', result); res.json(true) })
});

// completeStep3
router.post('/completeStep3', (req, res) => {
    const meta = req.body.meta;
    console.log('>> ID:', req.body.id);
    User.updateOne({"_id": ObjectID(req.body.id)}, { $set:{
            "personalPhoto": meta.personalPhoto,
            "gender": meta.gender,
            "jobTitle": meta.jobTitle,
            "bio": meta.bio,
            "birthMonth": meta.birthMonth,
            "birthDay": meta.birthDay,
            "birthYear": meta.birthYear,
            "status": 4
        } }).then(result => { console.log('>> Step 3 SUCCESS!', result); res.json(true) })
});

// completeStep4
router.post('/completeStep4', (req, res) => {
    const meta = req.body.meta;
    console.log('>> ID:', req.body.id);
    User.updateOne({"_id": ObjectID(req.body.id)}, { $set:{
            "isAvailable": meta.isAvailable,
            "schedule": meta.schedule,
            "status": 5
        } }).then(result => { console.log('>> Step 4 SUCCESS!', result); res.json(true) })
});

router.post('/setPassword', (req, res) => {
    let newPassword = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            User.updateOne({"email": req.body.email}, { $set:{
                    "password": newPassword
                } }).then(result => {
                if(result.nModified) {
                    res.json('Success').status(200);
                } else {
                    res.json('Error').status(400);
                }
            }).catch(error => console.log('>> error', error));
        });
    });


});

// Reset secret
router.post('/reset', (req, res) => {
    function makeSecret(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const newSecret = makeSecret(32);

    const token = jwt.sign({
        email: req.body.email,
        secret: newSecret
    }, keys.secretOrKey);

    User.updateOne({"email": req.body.email}, { $set:{
            "resetSecret": token
        } }).then(result => {
           if(result.nModified) {
               let HelperOptions = {
                   from: `"Denys" <${req.body.email}`,
                   to: req.body.email,
                   subject: 'Reset Password',
                   text: `Go to the: http://localhost:3000/reset/${token}/`
               };

               transporter.sendMail(HelperOptions, (error, info) => {
                   if (error) {
                       return console.log('>> Smth went wrong!', error);
                   }
                   console.log('>> The message was sent!', info)
               });

               res.json('Success');
           } else {
               res.json('Error');
           }

    }).catch(error => console.log('>> error', error));


});

// skipSteps
router.post('/completeSkip', (req, res) => {
    User.updateOne(
        { "_id": ObjectID(req.body.id) },
        {
            $set: {
                "status": 5
            }
        }
    ).then(result => {
        {
            console.log('>> Steps Skipped');
            req.json(true);
        }
    });
});

// POST edit User
router.post('/edit', (req, res) => {
    console.log('>>> ', req.body);
    console.log('>>> Type of', typeof ObjectID(req.body.userID), ObjectID(req.body.userID));
  //User.updateOne({ "_id": ObjectID(req.body.userID) }, { $set: { "name": req.body.meta.name, "rights": req.body.meta.rights } });

    User.updateOne({"_id": ObjectID(req.body.userID)},{$set:{"name":req.body.meta.name, "rights":req.body.meta.rights}}).then(result => console.log('>>> JOPA!!1!', result));
});


// resendToEmail
router.post('/resendToEmail', (req, res) => {
    const token = jwt.sign({
        email: req.body.email,
        date: new Date().toISOString()
    }, keys.secretOrKey);

    console.log('>> RTE', token, req.body);

    User.updateOne({"_id": ObjectID(req.body.id)}, {$set:{ "secret": token }})
        .then(result => { console.log('>> New Secret was send'); res.json(true) });

    let HelperOptions = {
        from: `"Denys" <${req.body.email}`,
        to: req.body.email,
        subject: 'Resending Email Confirmation',
        text: `Go to the: http://localhost:3000/confirmation/${token}`
    };

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log('>> Smth went wrong!', error);
        }
        console.log('>> The message was sent!', info)
    });
});


// LOGIN
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ 'email': email }).then(user => {
        if (!user) {
            return res.json({ errors: { email: "Email not found" } });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                };

                const token = jwt.sign({
                    id: user.id,
                    status: user.status,
                    rights: user.rights,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    parent: user.parent
                }, keys.secretOrKey);

                res.json({
                    success: true,
                    token,
                    userID: user.id,
                    status: user.status
                });
            } else {
                // return
                return res.json({ errors: { password: "Oops. That password isn't right." } });
            }
        }).catch(err => {
            return res.json({ errors: { password: "Oops. That password isn't right." } });
        });
    });
});



// LOGINAUTH
router.post("/loginAuth", (req, res) => {
    console.log('>>>> #3');

    const email = req.body.email;

    User.findOne({ 'email': email }).then(user => {
        console.log('>>>> #4');
        if (!user) {
            console.log('>>>> #5');
            return res.json({ errors: { email: "Email not found" } });
        }
        console.log('>>>> #6');

        const token = jwt.sign({
            id: user.id,
            status: user.status,
            rights: user.rights,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            parent: user.parent
        }, keys.secretOrKey);

        res.json({
            success: true,
            token,
            userID: user.id,
            status: user.status
        });
    });
});


module.exports = router;
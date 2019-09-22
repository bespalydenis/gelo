const Test = require('./models/testModel.js');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// change it
app.use(bodyParser.json({
    limit: '10000000000000000kb'
}));



const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true });


// Passport middleware
app.use(passport.initialize());


// Passport config
require('./config/passport')(passport);


// Router
app.use('/api/users', users);

app.post('/api/test', (req, res) => {
    console.log('1');
    // console.log('>> LOG', req.body.test);
    const doc = new Test({ test: req.body.test });
    doc.save();
    res.send('hello!');
});


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is Running!'));
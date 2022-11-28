const express = require('express');
const path = require('path');
const app = express();
require('../db/conn');
const User = require('../models/userRegistration');

// process.env.PORT is for server port
const port = process.env.PORT || 3000;

// to get data from form
app.use(express.urlencoded({ extended: false })); 

// to convert json data to javascript object
app.use(express.json()); 

// to use static pages 
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// to set the view engine
app.set("view engine", "hbs");


app.get('/', (req, res) => {
    res.render("index")
    });

app.get('/register', (req, res) => {
    res.render("register")
    });

app.get('/login', (req, res) => {
    res.render("login")
    });


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/about', (req, res) => res.send('Hello About!'));


// user registration route
app.post('/register', async (req, res) => {
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.phone || !req.body.address || !req.body.password || !req.body.cpassword) {
        return res.status(422).json({error: "Please fill the field properly"});
    }
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            const userRegistration = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: req.body.password,
                cpassword: req.body.cpassword
            });
            await userRegistration.save(); 
            res.status(201).render("login"); 
        }
        else {
            res.send("Password are not matching");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get user registration route
app.get('/registers', async (req, res) => {
    try {
        const userRegistration = await User.find();
        res.send(userRegistration);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// user login route
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await User.findOne({
            email: email
        });
        if (useremail.password === password) {
            res.status(201).render("index");
        
            // console.log("Login Successful");
            // console.log(useremail);
            // // cookie parser is used to store the data in the browser
            // const token = await useremail.generateAuthToken();
            // console.log(token);
            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 30000),
            //     httpOnly: true
            // });
        }
        else {
            res.send("Invalid Login Details");
        }
    } catch (error) {
        res.status(400).send("Invalid Login Details");
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
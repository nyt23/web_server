const express = require("express")
const app = express()

const port = 3000
const database = require('./database.js');
const cookieParser = require('cookie-parser')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.get('/login', (req, res) =>{
    res.sendFile(__dirname + '/public/login-page-scripts/login.html')
})

// configuration /dashboard.html to /dashboard

app.get('/dashboard', (req, res) => {
        res.sendFile(__dirname + '/public/dashboard-page-scripts/dashboard.html')
        console.log('Cookies:', req.cookies)

})

// configuration /home to /
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/landing-page-scripts/landing-page.html')
})
app.get('/', (req,res) => {
    res.redirect('/home');
});




app.post('/api/login', (req, res) => {

    let hasAuthenticatedUser = false;
    // for loop for multiple users
    for (let i = 0; i < database.users.length; i++) {
        const userToCheck = database.users[i];

        //if(req.body.username === database.users.username) {
        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password) {
            //console.log(`Token: ${req.body.username}_${Date.now()}`);
            const sessionToken = req.body.username + "_" + Date.now();
            console.log(sessionToken)
            res.send(sessionToken);
            //res.send(userToCheck.profilePicturePath);
            //res.sendFile(__dirname + '/public/dashboard-page-scripts/dashboard.html')
            hasAuthenticatedUser = true;
            break; // related to the for loop
        }
    }

    if (hasAuthenticatedUser === false) {
        res.sendStatus(404);
    }
});

app.get('/api/:username/city', (req, res) => {
    //console.log(req.body); // data is on the body object, to specify body.name

    let hasAuthenticatedUser = false;
    // for loop for multiple users
    for (let i = 0; i < database.users.length; i++) {
        const userToCheck = database.users[i];
        //if(req.body.username === database.users.username) {
        if (userToCheck.username === req.params.username) {
            //console.log(`Token: ${req.body.username}_${Date.now()}`);
            //const token = req.body.username + "_" + Date.now();
            res.send(userToCheck.city);
            hasAuthenticatedUser = true;
            break; // related to the for loop
        }
    }

    if (hasAuthenticatedUser === false) {
        res.send(404);
    }
});


app.get('/api/:username/profile-picture-path', (req, res) => {

    let hasAuthenticatedUser = false;
    // for loop for multiple users
    for (let i = 0; i < database.users.length; i++) {
        const userToCheck = database.users[i];

        if(userToCheck.username === req.params.username) {
            res.send(userToCheck.profilePicturePath);
            hasAuthenticatedUser = true;
            break;
        }
    }

    if (hasAuthenticatedUser === false) {
        res.sendStatus(404);
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

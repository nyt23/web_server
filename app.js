const express = require("express")
const app = express()

const port = 3000
const database = require('./database.js');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


app.get('/login.html', (req, res) =>{
    res.sendFile(login.html)
})

// configuration /dashboard.html to /dashboard

app.get('/dashboard', (req, res) => {
    res.redirect('/dashboard.html')
})

// configuration /home to /
app.get('/home', (req, res) => {
    res.redirect('http://localhost:3000/landing-page.html')
})

app.get('/', (req,res) => {
    res.redirect('/home');
});



// route configuration
app.get('/api/:username/profile-picture-path', (req, res) => {

    let hasAuthenticatedUser = false;
    // for loop for multiple users
    for (let i = 0; i < database.users.length; i++) {
        const userToCheck = database.users[i];

        //if(req.body.username === database.users.username) {
        if (userToCheck.username === req.params.username) {


            //console.log(`Token: ${req.body.username}_${Date.now()}`);
            //const token = req.body.username + "_" + Date.now();
            res.send(userToCheck.profilePicturePath);
            hasAuthenticatedUser = true;
            break; // related to the for loop
        }
    }

        if (hasAuthenticatedUser === false) {
            res.sendStatus(404);
        }


});

// respond token
    app.post('/api/login', (req, res) => {
        console.log(req.body); // data is on the body object, to specify body.name

        let hasAuthenticatedUser = false;
        // for loop for multiple users
        for (let i = 0; i < database.users.length; i++) {
            const userToCheck = database.users[i];
            if (userToCheck.username === req.body.username && userToCheck.password === req.body.password) {


                console.log(`Token: ${req.body.username}_${Date.now()}`);
                const token = req.body.username + "_" + Date.now();
                res.send(token);
                hasAuthenticatedUser = true;
                break; // related to the for loop
            }
        }

        if (hasAuthenticatedUser === false) {
            res.sendStatus(401);
        }
    });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const express = require("express")
const database = require("./database");
const weather_app = express()

const port = 3000



weather_app.use(express.static('public'))
weather_app.use(express.urlencoded({extended: true}))



weather_app.get('/home', (req, res) => {
    res.redirect('http://localhost:3000/landing-page.html')
})

weather_app.get('/', (req,res) => {
    res.redirect('/home');
});

weather_app.get('/login.html', (req, res) =>{
    res.sendFile(login.html)
})



weather_app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookiePar = require('cookie-parser');

dotenv.config({path: "./.env"});

const app = express();

// DB Connect
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
 db.connect((error) => {
    process.on('uncaughtException', function(err){
        console.log(err);
    });
    if(error){
        console.log(error);
    } else {
        console.log("Conectado!")
    }
 });


// Misc
const pdir = path.join(__dirname, './public');
app.use(express.static(pdir));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookiePar());


app.set('view engine', 'hbs');

// Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


// Probar conexion
app.set('port',3306);
process.on('uncaughtException', function(err){
    console.log(err);
});
app.listen(app.get('port'),() =>{
    console.log('Server on port: ', app.get('port'));
});


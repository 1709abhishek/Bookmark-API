const express = require('express');
const app = express();
const port = 8000;
const multer = require('multer');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });

const bodyParser = require('body-parser');

// body parser for req.body.params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//make the tmp folder available to the browser
app.use('/tmp',express.static(__dirname + '/tmp'));


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//requiring the routes

app.use('/', require('./api/routes'));
//running the express server
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server: ',err);
    }
     console.log(`server is running on port: ${port}`);
});
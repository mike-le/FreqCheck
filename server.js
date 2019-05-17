const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const sql = require("mssql");
const router = express.Router();
const cors = require('cors'); 

var freq = require('./frequencyCount.js');
var fs = require("fs");

app.use(cors());

router.use(function(req, res, next) {
    console.log('Something is happening...');
    next(); 
});

router.get('/', function(req, res) {
    fs.readFile("test.txt", "utf-8", (err, data) => {
        if (err) { 
            console.log(err) 
        } else {
            res.send(freq.getFreqCount(data));
        }
    })
});

app.use('/', router);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server running on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});
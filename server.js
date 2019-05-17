const express = require('express')
const multer = require('multer')
const app = express()
const port = process.env.PORT || 8080
const router = express.Router();
const cors = require('cors'); 

var freq = require('./frequencyCount.js');
var fs = require("fs");

app.use(cors());

const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

router.use(function(req, res, next) {
    console.log('Server initiated...');
    next(); 
});

app.post('/files', upload.single('file'), (req, res) => {
    fs.readFile(req.file.path, "utf-8", (err, data) => {
        if (err) { 
            res.send(err); 
        } else {
            res.send(freq.getFreqCount(data));
        }
    })
});

app.get('/files', (req, res) => res.send('Endpoint test successfull'));

app.use('/', router);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server running on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});
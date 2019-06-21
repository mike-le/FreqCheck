const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path');
const port = process.env.PORT || 8080
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

app.post('/files', upload.single('file'), (req, res) => {
    fs.readFile(req.file.path, "utf-8", (err, data) => {
        if(err){
            res.status(400).send(err);
        } else if(req.file.filename.split('.').pop() !== "txt"){
            res.status(400).send("Invalid file format");
        } else {
            res.status(200).send(freq.getFreqCount(data, req.body.stopword));
        }
    })
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => {
    var datetime = new Date();
    var message = "Server running on Port: " + port + "\nStarted on: " + datetime;
    console.log(message);
});
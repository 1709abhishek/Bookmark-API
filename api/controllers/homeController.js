const csv = require('fast-csv');
const multer = require('multer');
const DIR_NAME = "/Users/1709abhishek/Desktop/nodews/Bookmark-API/"
const Files = require('../models/Files');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', FILE_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({ dest: 'tmp/csv/' });
const fs = require('fs');

module.exports.index = function(req,res){
    try {
        return res.render('index', {
            title: "home"
        });
    } catch (err) {
        console.log('********',err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.upload = async function (req, res) {
    const fileRows = [];
    
    try {
        csv.parseFile(req.file.path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            console.log(fileRows);
            // fs.unlinkSync();   // remove temp file
            //process "fileRows" and respond
        });
        var new_file = new Files({filename: req.file.path});
        let file = await new_file.save();
        return res.json(200, {
            message: "file uploaded successfully"
        });
    } catch (err) {
        console.log('********',err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    // open uploaded file
}
module.exports.show = async function(req, res) {
    try {
        const col = await Files.find({});
        return res.render('home', {
            title: 'showing all files',
            Files: col
        });
    } catch (err) {
        console.log('******', err);
        res.render(400, {
            message: "error in database"
        });
    }
}

module.exports.select = async function(req,res){
    try {
        const fileRows = [];
        let file = await Files.findById(req.params.id);
        let file_id = req.params.id;
        let url = DIR_NAME + file.filename;
        csv.parseFile(url)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            // console.log(fileRows);
            // fs.unlinkSync(url);   // remove temp file
            //process "fileRows" and respond
            return res.render('select', {
                title: "selected file",
                fileRows: fileRows,
                file_id: file_id
            });
        });
    } catch (err) {
        console.log('********',err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.search = async function(req,res){

    try {
        const fileRows = [];
        console.log(req.params.id);
        let presentFile = await Files.findById(req.params.id);

        let url = DIR_NAME + presentFile.filename;
        let searchTerm = req.body.searchTerm;
        console.log(searchTerm);
        csv.parseFile(url)
        .on("data", function (data) {
            // if(data.find(req.body.searchTerm)){
            //     fileRows.push(data); //push each row
            // }
            if(data[1]==req.body.searchTerm){
                fileRows.push(data);
            }
        })
        .on("end", function () {
            console.log(fileRows);
            // fs.unlinkSync(url);   // remove temp file
            //process "fileRows" and respond
            return res.render('search', {
                title: "searched data",
                fileRows: fileRows
            });
        });
    } catch (err) {
        console.log('********',err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
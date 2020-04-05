const csv = require('fast-csv');
const multer = require('multer');
const Files = require('../models/Files');
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

module.exports.upload = async function (req, res) {
    const fileRows = [];
    
    try {
        csv.parseFile(req.file.path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            console.log(Files.FILE_PATH + '/' + req.file.path);
            fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond
        });
        console.log(req.file.filename);
        var new_file = await new Files({filename: req.file.filename});
        let file = await new_file.save();
        return res.json(200, {
            message: "File upload successful"
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
        res.json(200, {
            message: "showing all uploaded csv files",
            col: col
        })
    } catch (err) {
        console.log('******', err);
        res.json(400, {
            message: "error in database"
        });
    }
}
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/tmp/csv');

//defining schema
const filesSchema = new mongoose.Schema({
    // link of files
    filename: {
        type: String,
        required: true,
        unique: true
    },
}, {
        timestamps: true
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', FILE_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//static
filesSchema.statics.file_path = FILE_PATH;

//defining variable
const Files = mongoose.model('Files', filesSchema);

//exporting module
module.exports = Files;
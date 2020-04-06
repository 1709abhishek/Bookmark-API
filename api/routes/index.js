const express = require('express');

const multer = require('multer');
const csv = require('fast-csv');

const Router = express.Router;
const upload = multer({ dest: 'tmp/csv/' });

const router = express.Router();

const fs = require('fs');

const homeController = require('../controllers/homeController');

router.post('/upload-csv', upload.single('file'), homeController.upload);

router.get('/show-all', homeController.show);

router.get('/show/:id', homeController.select);

router.post('/search/:id', homeController.search);
  


module.exports = router;
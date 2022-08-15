'use strict';
const Image = require('../Database/Classes/Image');
const newImage = new Image();

const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = require('path');
const multer = require('multer');

//============= Config Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //'/home/obieda/memory-game/MemoryGame-Backend/src/routes/images'  
        cb(null, path.join(__dirname, './images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    },

})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        // console.log(ext, "ext");
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },

}

);

//============= Config Multer


//==============upload images
// upload.single >>>>>>> req.file  
// upload.array("image" , 3 //maxCount) >>>>>>> req.files
router.post('/uploadImages', upload.array("image"), (req, res) => {
    console.log('req.files', req.files);
    // console.log(fs.readFileSync(req.files[0].path));
    // var img = fs.readFileSync(req.files[0].path).toString('base64');
    // var encode_img = img.toString('base64');
    // var image = new Buffer.from(encode_img, 'base64');
    // console.log(image);
    // console.log(encode_img);
    // console.log({ img });
    let images = req.files.map((image) => {
        return {
            image_name: image.filename,
            img: {
                contentType: image.mimetype,
                data: new Buffer.from(fs.readFileSync(image.path).toString('base64'), 'base64')
            }
        }
    });
    newImage.addImages(images).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });

});


//==============upload images


module.exports = router;

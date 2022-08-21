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


//==============Start upload images
// upload.single >>>>>>> req.file  
// upload.array("image" , 3 //maxCount) >>>>>>> req.files
router.post('/uploadImages/:questionId', upload.array("image"), (req, res) => {
    console.log(2111);

    console.log('req.files', req.files);
    console.log(2221);

    // var buff = fs.readFileSync(req.files[0].path)
    // console.log({ buff });
    // var base64Data = buff.toString('base64');
    // console.log({ base64Data });
    // var bufff = new Buffer.from(base64Data, 'base64')
    // console.log({ bufff });
    // console.log(req.files[0].path);



    let images = req.files.map((image) => {
        return {
            image_name: image.filename,
            img: {
                contentType: image.mimetype,
                data: new Buffer.from(fs.readFileSync(image.path).toString('base64'), 'base64')
            },
            question_id: req.params.questionId
        }
    });
    console.log(images, 222222233);

    newImage.addImages(images).then((doc) => {

        console.log(doc, 444111144);

        res.status(201).json(doc);
    }).catch((err) => {
        res.status(500).json(err);
    });

});


//==============End upload images



//===============Start getImages
router.get('/getImages/:questionId', (req, res) => {
    newImage.getImages(req.params.questionId).then((data) => {
        // let path = `data:${data[0].img.contentType};base64, ${Buffer.from(data[0].img.data).toString('base64')}`;
        // console.log({ path });
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

//===============End getImages
module.exports = router;

const ImageModel = require('../schemas/image.schema');


class Image {


    //===================Start addImages methode
    addImages(images) {
        return new Promise((resolve, reject) => {
            ImageModel.insertMany(images).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    //===================End addImages methode


    //===================Start getImages methode

    getImages(questionId) {
        return new Promise((resolve, reject) => {
            ImageModel.find({ question_id: questionId }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    //===================End getImages methode


}


module.exports = Image;
'use strict';

const mongoose = require('mongoose');

class Database {
    constructor() {
        this.Url = process.env.MONGODB_URL || 'mongodb://admin:admin123@ac-xmvmpuy-shard-00-00.kdtjkvq.mongodb.net:27017,ac-xmvmpuy-shard-00-01.kdtjkvq.mongodb.net:27017,ac-xmvmpuy-shard-00-02.kdtjkvq.mongodb.net:27017/?ssl=true&replicaSet=atlas-10gmdo-shard-0&authSource=admin&retryWrites=true&w=majority'
    }

    //===================Start connect methode

    connect() {
        mongoose.connect(this.Url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Database connected successfuly');
        }
        ).catch((err) => {
            console.log('Error in connecting to database', err);
        });
    }

    //====================End connect methode


}


module.exports = Database;
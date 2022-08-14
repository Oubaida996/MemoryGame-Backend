'use strict';

const mongoose = require('mongoose');

class Database {
    constructor() {
        this.Url = 'mongodb://localhost:27017/memory-game'
    }

    //===================Start connect methode

    connect() {
        mongoose.connect(this.Url).then(() => {
            console.log('Database connected successfuly');
        }
        ).catch((err) => {
            console.log('Error in connecting to database', err);
        });
    }

    //====================End connect methode


}


module.exports = Database;
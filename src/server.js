'use strict';


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');




const Database = require('./Database/Database');
const db = new Database;

const routerQuestion = require('./routes/questions.routes');
const routerImage = require('./routes/image.routes');
const routerRigistration = require('./routes/registration.routes');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routerQuestion);
app.use(routerImage);
app.use(routerRigistration);

app.get('/', (req, res) => res.json(`Home Page`));

function start(port) {
    app.listen(port, () => {
        console.log(`Server is running on Port ${port}`);
        db.connect();
    })
}







module.exports = {
    app: app,
    start: start
}
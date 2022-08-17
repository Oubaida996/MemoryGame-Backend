'use strict';

const Question = require('../Database/Classes/Question'); //it is class
const newQuestion = new Question();

const express = require('express');
const router = express.Router();
const aclAuth = require('../auth/middleware/acl.auth');
const bearerAuth = require('../auth/middleware/bearer.auth');


//Routes
router.post('/questions', bearerAuth, aclAuth, createQuestion);
router.get('/questions', getQuestions);


//===================Start createQuestion function
function createQuestion(req, res) {
    let question = req.body;

    newQuestion.addQuestion(question).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });

}

//===================End createQuestion function


//===================Start getQuestions function
function getQuestions(req, res) {

    newQuestion.getQuestions().then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });

}

//===================End getQuestion function



module.exports = router;
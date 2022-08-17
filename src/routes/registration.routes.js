'use strict';

const express = require('express');
const router = express.Router();
const bcrybt = require('bcrypt');
const Users = require('../Database/Classes/User');
const newUsers = new Users();

const basicAuth = require('../auth/middleware/basic.auth');
const bearerAuth = require('../auth/middleware/bearer.auth');

router.get('/users', bearerAuth, getUsers);
router.post('/signup', signup);
router.get('/signin', basicAuth, signin);

function getUsers(req, res) {
    newUsers.getUsers().then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
    });


}


async function signup(req, res) {
    let body = req.body;
    let { user_email, user_pwd } = body;
    console.log(user_email, user_pwd);
    let emailWithoutSpace = user_email.replace(/\s/g, '');


    try {
        let hashedPwd = await bcrybt.hash(user_pwd, 5);
        // console.log('before create');
        const newUser = await newUsers.addUser({
            ...body,
            user_email: emailWithoutSpace,
            user_pwd: hashedPwd,
        });
        // console.log('after create');
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`Error from signUp function in router file ${error}`);
    }


}


function signin(req, res) {

    res.status(200).json(req.user.token);
}

module.exports = router;

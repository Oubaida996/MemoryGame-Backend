const mongoose = require('mongoose');
const userModel = require('../schemas/user.schema');
const bcrybt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET = "SECRET";

class Users {

    //=====Start getUsers
    getUsers() {
        return new Promise((resolve, reject) => {
            userModel.find({}).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });

    }

    //=====End getUsers

    //=====Start addUser
    addUser(body) {
        return new Promise((resolve, reject) => {
            userModel.create(body).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        });
    }
    //=====End addUser

    //=====Start authenticateBasic
    authenticateBasic(userEmail, password) {
        return new Promise((resolve, reject) => {
            console.log({ userEmail }, { password });
            userModel.findOne({ user_email: userEmail }).then((user) => {

                bcrybt.compare(password, user.user_pwd).then((valid) => {

                    // console.log({ valid });
                    // generate a new token
                    let newToken = jwt.sign({ userEmail: user.user_email }, SECRET);
                    // console.log({ newToken });
                    user.token = newToken;
                    // console.log(user.token);
                    resolve(user);
                });

            }).catch((err) => {
                reject({ err: err, from: 'from authenticateBasic ' });
            });
        });
    }

    //=====End authenticateBasic


    //=====Star validateToken


    validateToken(token) {
        return new Promise((resolve, reject) => {
            try {
                const parsedToken = jwt.verify(token, SECRET);
                console.log('llllllll', parsedToken);
                userModel.findOne({ user_email: parsedToken.userEmail }).then((user) => {
                    resolve(user);
                }).catch((error) => {
                    reject({ err: error, from: 'invalid token' });
                    //send the error to catch in bearer.auth file
                });
            } catch (error) {
                throw (error, 'invalid token');
            }

        });

    }
    //=====End validateToken
}
module.exports = Users;
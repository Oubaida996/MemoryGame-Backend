'use strict';
const Users = require('../../Database/Classes/User');
const newUsers = new Users;


module.exports = async (req, res, next) => {
    if (req.headers['authorization']) {
        // 'Bearer token'
        let bearerHeaderParts = req.headers.authorization.split(' ');
        // console.log('bearerHeaderParts >>> ',bearerHeaderParts); // ['Bearer','token']
        let token = bearerHeaderParts.pop(); //encoded(username:password)
        // console.log('Token >>> ',token);

        try {
            let user = await newUsers.validateToken(token);
            if (user) {
                req.user = user;
                // console.log('user inside bearer middleware', req.user);
                next();
            } else {
                res.status(403).send('invalid ddddddddddddd');
            }
        } catch (error) {
            res.status(403).send(`${error}`);
        }

    } else {
        next('token is not correct or null');
    }
}
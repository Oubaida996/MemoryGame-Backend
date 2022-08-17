'use strict'

const base64 = require('base-64');
const Users = require('../../Database/Classes/User');
const newUsers = new Users;


module.exports = async (req, res, next) => {
    // console.log('kkkk');
    if (req.headers['authorization']) {
        let basicHeaderParts = req.headers.authorization.split(' ');
        // console.log('basicHeaderParts >>> ',basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); //encoded(userEmail:password)
        // console.log('encodedPart >>> ',encodedPart);
        let decoded = base64.decode(encodedPart); //userEmail:password
        // console.log('decoded >>> ',decoded);
        let [userEmail, password] = decoded.split(':'); //[userEmail: password]
        // console.log('username');

        await newUsers.authenticateBasic(userEmail, password).then((validUser) => {
            // console.log({ validUser });
            req.user = validUser;
            // console.log(req.user.token, 'token');
            next();
        }).catch((err) => {
            res.status(403).json({ err: err, from: "authenticateBasic" });
        });



    }
}
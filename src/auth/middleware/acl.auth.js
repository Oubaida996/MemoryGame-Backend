'use strict';


module.exports = async (req, res, next) => {

    try {

        if (req.user.isAdmin) {
            // console.log('user inside acl middleware', req.user);
            next();

        } else {
            res.status(500).json('access denied from acl auth');
        }
    } catch (error) {

    }
}




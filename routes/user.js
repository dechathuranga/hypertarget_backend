var express = require('express');
var router = express.Router();
var mysqlPool = require('../config/mysqlConnection');

// ////////////////////////////////////////////////////////
//Add User Detail

/* Add User Detail Service. */
router.post('/add', function (req, res) {
    logger.info('inside new User ' + req.body.first_name );
    if (!req.body.first_name || !req.body.email) {
        logger.info('Validation error.');
        res.json({ success: false, msg: 'Please Fill Form Corectly.' });
    } else {

        let user;
        user = {
          
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            is_active: 0,
            user_type: req.body.user_type,
        };

        const sql = "insert into user set ?";
        const mysqlConnection = mysqlPool((err, connection) => {
            if (err) {
                connection.release();
                logger.error('mysql connection error. ' + err.message);
                return res.status(500).send({ success: false });
            }
            logger.info(sql);
            connection.query(sql, user, (err, result) => {
                connection.release();
                if (err) {
                    // connection.release();
                    logger.error('mysql connection error. ' + err.message);
                    if (err.code == "ER_DUP_ENTRY") {
                        return res.json({ success: false, msg: 'User name exist.' });
                    }
                    return res.status(500).send({ success: false });
                }
                else
                    //connection.release();
                    logger.info('User Added Sucsses!');
                return res.json({ success: true, msg: 'User added' });

            });
        });



    }
});


// ////////////////////////////////////////////////////////
//Get User login Detail By user name and password

/* Get User login Detail By user name and password Service. */
router.post('/login', (req, res) => {
    logger.info('Get user login Detail By user name and password');
    mysqlConnection = mysqlPool((err, connection) => {
        if (err) {
            connection.release();
            logger.error('mysql connection error. ' + err.message);
            return res.status(500).send({ success: false });

        } else {

            logger.info('connect user Detail login');
            var sql = "select * from user where is_active = 1 and email = '" + req.body.email + "' and password = '" +req.body.password + "' ";
            console.log(sql);
            connection.query(sql, function (err, result) {
                connection.release();
                if (err) {
                    logger.error('mysql connection error. ' + err.message);
                    return res.status(500).send({ success: false });

                } else {
                    logger.info('got user detail all view results set now !');
                    return res.json({ success: true, result });
                }

            });
        }
    });
});

module.exports = router;
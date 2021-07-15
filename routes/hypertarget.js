var express = require('express');
var router = express.Router();
var mysqlPool = require('../config/mysqlConnection');

// ////////////////////////////////////////////////////////
//Add Haypertarget Detail

/* Add Haypertarget Detail Service. */
router.post('/add', function (req, res) {
    logger.info('inside new Haypertarget ' + req.body.tagName );
    if (!req.body.tagName) {
        logger.info('Validation error.');
        res.json({ success: false, msg: 'Please Fill Form Corectly.' });
    } else {

        let haypertarget;
        haypertarget = {
            eventType: req.body.eventType,
            semanticType: req.body.semanticType,
            haypertargetcol: req.body.haypertargetcol,
            value: req.body.value,
            type: req.body.type,
            placeholder: req.body.placeholder,
            tagName: req.body.tagName,
            backgroundImageSrc: req.body.backgroundImageSrc,
            src: req.body.src,
            alt: req.body.alt,
            elementId: req.body.elementId,
            cssClass: req.body.cssClass,
            href: req.body.href,
            innerText: req.body.innerText,
            title: req.body.title,
            cursor: req.body.cursor,
            hasPseudoElementContent: req.body.hasPseudoElementContent,
            timeStamp: new Date(),
            url: req.body.url,
            scriptToken: req.body.scriptToken,
            name: req.body.name,
           
        };

        const sql = "insert into haypertarget set ?";
        const mysqlConnection = mysqlPool((err, connection) => {
            if (err) {
                connection.release();
                logger.error('mysql connection error. ' + err.message);
                return res.status(500).send({ success: false });
            }
            logger.info(sql);
            connection.query(sql, haypertarget, (err, result) => {
                connection.release();
                if (err) {
                    // connection.release();
                    logger.error('mysql connection error. ' + err.message);
                    if (err.code == "ER_DUP_ENTRY") {
                        return res.json({ success: false, msg: 'haypertarget name exist.' });
                    }
                    return res.status(500).send({ success: false });
                }
                else
                    //connection.release();
                    logger.info('Haypertarget Added Sucsses!');
                return res.json({ success: true, msg: 'Hypertarget added' });

            });
        });



    }
});

// ////////////////////////////////////////////////////////
//Get Shop Detail By user id

/* Get Shop Detail is Special Discount Service. */
router.get('/getByUserId', (req, res) => {
    logger.info('Get Item Detail is Special Discount');
    mysqlConnection = mysqlPool((err, connection) => {
        if (err) {
            connection.release();
            logger.error('mysql connection error. ' + err.message);
            return res.status(500).send({ success: false });

        } else {
            
            logger.info('connect Driver Detail all view');
            var sql = "select * from serv_me.user where is_active = 1 and id = " + req.query.user_id ;
            // var sql = "select * from iot_breathlizer.driver_detail Where LICEN_NO =  '"+ licenseNumber +"'" ;
            console.log(sql);
            connection.query(sql, function (err, result) {
                connection.release();
                if (err) {
                    logger.error('mysql connection error. ' + err.message);
                    return res.status(500).send({ success: false });

                } else {
                    logger.info('got Item detail all view results set now !');
                    return res.json({ success: true, result });
                }

            });
        }
    });
});

// ////////////////////////////////////////////////////////
//Get Shop Detail By user id

/* Get Shop Detail is Special Discount Service. */
router.post('/login', (req, res) => {
    logger.info('Get Item Detail is Special Discount');
    mysqlConnection = mysqlPool((err, connection) => {
        if (err) {
            connection.release();
            logger.error('mysql connection error. ' + err.message);
            return res.status(500).send({ success: false });

        } else {

            logger.info('connect Driver Detail all view');
            var sql = "select * from serv_me.user where is_active = 1 and user_name = '" + req.body.userName + "' and password = '" +req.body.password + "' ";
            // var sql = "select * from iot_breathlizer.driver_detail Where LICEN_NO =  '"+ licenseNumber +"'" ;
            console.log(sql);
            connection.query(sql, function (err, result) {
                connection.release();
                if (err) {
                    logger.error('mysql connection error. ' + err.message);
                    return res.status(500).send({ success: false });

                } else {
                    logger.info('got Item detail all view results set now !');
                    return res.json({ success: true, result });
                }

            });
        }
    });
});

module.exports = router;
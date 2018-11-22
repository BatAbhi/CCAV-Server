const express = require('express')
const router = express.Router()
const ccav = require('./../../config/ccavutil')


router.post('/post', (req, res, next) => {

    var body = JSON.stringify(req.body);
    var workingKey = 'XXXXXXXXXXXXXXX'
    var encRequest = ccav.encrypt(body,workingKey); 
    try {
        console.log(body);
        res.json(encRequest);
    }
    catch (err) {
      console.log(err)
    }

});




module.exports = router
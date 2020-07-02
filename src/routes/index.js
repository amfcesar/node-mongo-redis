
const express = require('express');
const { description, version } = require('../../package.json');
const router = express.Router();

router.get('/',  (req, res, next) => {
    res.status(200).send({ 
        title: description,
        version
    });
});

module.exports = router;

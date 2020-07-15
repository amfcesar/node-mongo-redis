const express = require('express');
const router = express.Router();
const { userPost } = require('../schema/schema')

const controller = require('../controllers/personController');
const middleware = require('../middleware/middlewareValidation'); 

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', middleware(userPost), controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
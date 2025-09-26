const express = require('express');
const ExampleController = require('../controllers/ExampleController');

const router = express.Router();

// RESTful endpoints
router.get('/examples', ExampleController.list);
router.post('/examples', ExampleController.create);

module.exports = router;

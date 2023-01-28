const express = require('express');
const router = express.Router(); //Calling the router Middleware with express Library
const QuizController = require('../controller/QuizController.js')

router
.route('/')
.get(QuizController.GetQuiz)
module.exports = router;
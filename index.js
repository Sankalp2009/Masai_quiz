// Only Handling Express Work
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json()); // JSON Middleware // URL Encoding Middleware
const QuizRoutes = require('./Routes/QuizRoute')
app.use(cors({
   origin: '*',
})); // Cross Origin Resource Sharing Middleware 
app.use('/api/v1/quiz',QuizRoutes);
module.exports = app;
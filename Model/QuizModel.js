const mongoose = require("mongoose");
const QuizSchema = new mongoose.Schema({
  category: { 
    type: String 
  },
  type: { 
    type: String 
  },
  difficulty: { 
    type: String 
  },
  question: { 
    
    type: String 
  },
  correct_answer: { 
    type: String 
  },
  incorrect_answers: [{ type: String, required:true }],
});
const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz
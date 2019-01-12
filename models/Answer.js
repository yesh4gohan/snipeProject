const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answerDescription:{
    type:String,
    required:true
  },
  attachments:{
    type:String
  },
  upVotes:{
    type:Number,
    default:0
  },
  comments:{
    type:Schema.Types.ObjectId,
    ref:"comments"
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = Answer = mongoose.model("answer",AnswerSchema);
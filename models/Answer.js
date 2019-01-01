const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answerDescription:{
    type:String,
    required:true
  },
  imageAttachment:{
    type:Schema.Types.ObjectId,
    ref:"img"
  },
  textAttachment:{
    type:Schema.Types.ObjectId,
    ref:"files"
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
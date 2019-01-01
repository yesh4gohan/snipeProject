const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issueTitle:{
    type:String,
    required:true
  },
  language:{
    type:String,
    required:true
  },
  issueType:{
    type:String,
    required:true
  },
  issueDescription:{
    type:String,
    required:true
  },
  requests:{
    type:Number,
    default:0
  },
  views:{
    type:Number,
    default:0
  },
  answerCount:{
    type:Number
  },
  answers:[{
    answer:{
      type:Schema.Types.ObjectId,
      ref:"answer"
    }
  }]
});

module.exports = Issue = mongoose.model("issue",IssueSchema);


// {
//   "_id": {
//       "$oid": "5c1e8b987669890bb83d9987"
//   },
//   "issueTitle": "issue1",
//   "issueDescription": "description for issue1",
//   "votes": 0,
//   "attachments": [],
//   "answerdIssues": [],
//   "date": {
//       "$date": "2018-12-22T19:08:09.003Z"
//   },
//   "__v": 0
// }
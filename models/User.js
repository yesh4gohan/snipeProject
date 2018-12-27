const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  email: {
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    name: {
      type: String,
      required: true
    },
    skills: {
      type: [String]
    }
  },
  assignedIssues: {
    type: [String],
    required: false
  },
  answerdIssues: {
    type: [String],
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);

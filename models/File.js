let mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  textFile: {
    data: Buffer,
    contentType: String
  }
});

module.exports = FileInput = mongoose.model("files",FileSchema);

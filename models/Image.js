const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  img: { data: Buffer, contentType: String }
});
module.exports = ImageInput = mongoose.model("img", ImageSchema);

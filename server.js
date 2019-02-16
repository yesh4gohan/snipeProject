const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/config").mongoURI;
const users = require("./routes/api/users");
const issues = require("./routes/api/issues");
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
//const fileFilter = require('./utils/multerConfig')
// this is required to access req.body
const app = express();

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "DOC_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("attachment");
app.use(cors());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload);
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connect to DB"))
  .catch(err => console.log({ ERROR: err }));

app.get("/", (req, res) => res.send("hello"));

app.use("/api/users", users);
app.use("/api/issues", issues);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening to port ${port}`));

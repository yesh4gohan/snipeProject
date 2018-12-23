const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/config").mongoURI;
const users = require("./routes/api/users");
const issues = require("./routes/api/issues");
const bodyParser = require("body-parser");

// this is required to access req.body
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose
.connect(db)
.then(()=>console.log("connect to DB"))
.catch((err)=>console.log({ERROR:err}))

app.get("/",(req,res)=>res.send("hello"));

app.use("/api/users",users);
app.use("/api/issues",issues);

const port = process.env.PORT || 9000;
app.listen(port,()=>console.log(`listening to port ${port}`));
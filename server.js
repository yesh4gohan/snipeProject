const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/config").mongoURI;
const users = require("./routes/api/users");
const issues = require("./routes/api/issues");

mongoose
.connect(db)
.then(()=>console.log("connect to DB"))
.catch((err)=>console.log({ERROR:err}))
const app = express();
app.get("/",(req,res)=>res.send("hello"));

app.use("/api/users",users);
app.use("/api/issues",issues);

const port = process.env.PORT || 9000;
app.listen(port,()=>console.log(`listening to port ${port}`));
const express = require("express");
const ImageInput = require("../../models/Image");
const FileSchema = require("../../models/File");
const IssueSchema = require("../../models/Issue");
const AnswerSchema = require("../../models/Answer");
const fs = require("fs");
const path = require("path");

//const path = require("path");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "issues route is working" }));

router.post("/addImage", (req, res) => {
  const image = fs.readFileSync(req.payload);
  const img_file = new ImageInput(image);
  img_file
    .save()
    .then(res => console.log(res))
    .catch(err => console.log(err));
  // const imgInput = new ImageInput();

  // //const path = require("C:Users\ADMIN\Desktop\Udemy\Mern\refFiles\devconnector_theme\img\showcase.jpg")
  // imgInput.img.data = fs.readFileSync(
  //   "showcase.jpg"
  // );
  // imgInput.img.contentType = "image/jpg";
  // imgInput.save()
  // .then(res=>{
  //   try{
  //   fs.writeFileSync("dummyimg.jpg",res.img.data)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // })
  // .catch(err=>console.log(err))
});

router.post("/addFile", (req, res) => {
  const fileIp = new FileInput();
  console.log({ FILE: req.body });
  fileIp.textFile.data = req.body.toString();
  fileIp.textFile.contentType = "text/plain";
  fileIp
    .save()
    .then(result => {
      res.send("success");
    })
    .catch(err => console.log(err));
});

router.get("/getFile", (req, res) => {
  FileSchema.findById("5c250437f041762318511314")
    .then(result => {
      fs.writeFileSync("dummt2.txt", result.textFile.data);
      res.send("success");
    })
    .catch(err => console.log(err));
});

router.get("/getIssues", (req, res) => {
  // const pathname = path.join(__dirname,'..','..','snipe_client','src','etc','dummyIssue.json');
  // const data = fs.readFileSync(pathname);
  // res.send(data);
  IssueSchema.find()
    .sort()
    .then(results => res.json(results));
});

router.post("/postImage", (req, res) => {
  const image = req.file;
  if (!image) {
    return res.status(400).json({ message: "Failed to Upload" });
  }
  return res.status(200).json(image);
});

router.post("/postIssue", (req, res) => {
  let issueObj = { ...req.body };
  const issueDB = new IssueSchema(issueObj);
  issueDB
    .save()
    .then(result => res.send("success"))
    .catch(err => console.log(err));
});

router.get("/getIssue/:id", (req, res) => {
  let id = req.params.id;
  IssueSchema.findById(id)
    .then(response => res.json(response))
    .catch(err => console.log(err));
});

router.get('/getAnswer/:id',(req,res)=>{
  AnswerSchema.findById(req.params.id)
  .then(answer=>res.send(answer))
  .catch(err=>console.log(err))
})

router.post("/postAnswer", (req, res) => {
  let newAnswer = {};
  let existingAnswer = [];
  newAnswer.answerDescription = req.body.answerDescription;
  newAnswer.attachments = req.body.attachments;
  let answerItem = new AnswerSchema(newAnswer);
  answerItem
  .save()
  .then(currentAnswer=>{
    IssueSchema.findById(req.body.issueId)
    .then(currentIssue=>{
      existingAnswer = [...currentIssue.answers];
      existingAnswer.push(currentAnswer);
      IssueSchema.findOneAndUpdate(
        { _id: req.body.issueId },
        { $set: { answers:existingAnswer } }
      )
      .then(updatedIssue=>{
        console.log(updatedIssue);
        res.json({message:"success"});
      })
    })
  })
});
module.exports = router;


 
const express = require("express");
const ImageInput = require("../../models/Image");
const FileSchema = require("../../models/File");
const IssueSchema = require("../../models/Issue");
const fs = require("fs");
const path = require("path");

//const path = require("path");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "issues route is working" }));

// router.post("/addImage", (req, res) => {
//   const imgInput = new ImageInput();
  
//   //const path = require("C:Users\ADMIN\Desktop\Udemy\Mern\refFiles\devconnector_theme\img\showcase.jpg")
//   imgInput.img.data = fs.readFileSync(
//     "showcase.jpg"
//   );
//   imgInput.img.contentType = "image/jpg";
//   imgInput.save()
//   .then(res=>{
//     try{
//     fs.writeFileSync("dummyimg.jpg",res.img.data)
//     }
//     catch(e){
//       console.log(e)
//     }
//   })
//   .catch(err=>console.log(err))
// });

// router.post("/addFile",(req,res)=>{
  
//   const fileIp = new FileInput();
//   fileIp.textFile.data = fs.readFileSync("sample.txt");
//   fileIp.textFile.contentType = "text/plain"
//   fileIp.save()
//   .then(result=>{
//     res.send("success")
//   })
//   .catch(err=>console.log(err))
// })

// router.get("/getFile",(req,res)=>{
//   FileSchema.findById("5c250437f041762318511314")
//   .then(result=>{
//     fs.writeFileSync("dummt2.txt",result.textFile.data);
//     res.send("success")
//   })
//   .catch(err=>console.log(err))
// })

router.get("/getIssues",(req,res)=>{
  const pathname = path.join(__dirname,'..','..','snipe_client','src','etc','dummyIssue.json');
  const data = fs.readFileSync(pathname);
  res.send(data);
})

router.post('/postIssue',(req,res)=>{
  let issueObject = req.body;
  console.log(issueObject)
  const issue = new IssueSchema(issueObject);
  issue.save()
  .then(result=>res.json({message:"success"}))
  .catch(eerr=>console.log(eerr))
  
})
module.exports = router;

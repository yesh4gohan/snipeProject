const multer = require('multer');
const fileFilter =()=>{ multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images');
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toISOString()+'-'+file.originalname);
  }
})
}
module.exports = fileFilter;
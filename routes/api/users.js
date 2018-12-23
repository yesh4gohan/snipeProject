const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput  = require("../../validations/register");
//@route GET api/users/test
//@desc Test the route
//@access Public

router.get("/test", (req, res) => res.json({ msg: "users route is working" }));

//@route POST api/users/register
//@desc Test the route
//@access Public

router.post("/register", (req, res) => {
  let {errors,isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    else{
      let userObject = {};
      userObject.role = req.body.role;
      userObject.bio = {
        name:"",
        skills:[]
      };
      userObject.email = req.body.email;
      userObject.bio.name = req.body.name;
      userObject.password = req.body.password;
      if(req.body.skills !== undefined){
        let skillsArray = req.body.skills.split(",");
        for(let skill of skillsArray){
        userObject.bio.skills.push(skill);
        }
      }
      const newUser = new User(userObject);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

    }
  });
});

module.exports = router;

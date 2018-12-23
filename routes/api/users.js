const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const secret = require("../../config/config").secretOrKey;
const passport = require("passport");

//@route GET api/users/test
//@desc Test the route
//@access Public

router.get("/test", (req, res) => res.json({ msg: "users route is working" }));

//@route POST api/users/register
//@desc Test the route
//@access Public

router.post("/register", (req, res) => {
  let { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already taken";
      return res.status(400).json(errors);
    } else {
      let userObject = {};
      userObject.role = req.body.role;
      userObject.bio = {
        name: "",
        skills: []
      };
      userObject.email = req.body.email;
      userObject.bio.name = req.body.name;
      userObject.password = req.body.password;
      if (req.body.skills !== undefined) {
        let skillsArray = req.body.skills.split(",");
        for (let skill of skillsArray) {
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
            .catch(err => {
              errors.server = "Internal server error";
              res.status(500).json(errors);
            });
        });
      });
    }
  });
});

//@route POST api/users/login
//@desc login registeredd user
//@access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payLoad = {
                id: user.id,
                name: user.bio.name,
                email: user.email
              };
              jwt.sign(payLoad, secret, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                  errors.server = "Internal server error";
                  return res.status(500).json(errors);
                }
                return res.json({
                  success: true,
                  token: "bearer " + token
                });
              });
            } else {
              errors.password = "please enter correct password";
              return res.status(400).json(errors);
            }
          })
          .catch(err => {
            errors.server = "Internal server error";
            res.status(500).json(errors);
          });
      } else {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      errors.server = "Internal server error";
      res.status(500).json(errors);
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.bio.name,
      email: req.user.email
    });
  }
);

module.exports = router;

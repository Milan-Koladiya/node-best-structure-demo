const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const { signUp, logIn } = require("../controllers/userControllers");
const sendMail = require("../sendmail/sendmail");
const auth = require("../auth/auth");
const User = require("../model/user");
const postModel = require("../model/post");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 1000000 },
});

// ************* User SignUp ***************
router.post("/signup", upload.single("Image"), signUp);

// ************* User login ***************

router.post("/login", logIn);

// ************* User logout ***************

router.post("/logout", auth, async (req, res) => {
  const ruser = req.user;
  const token = req.token;
  const remainToken = await ruser.tokens.filter(
    (tokenobj) => tokenobj.token !== token
  );
  ruser.tokens = remainToken;
  ruser.save();
  res.status(200).send("logout success");
});

// ************* User delete ***************

router.delete("/userdelete", auth, async (req, res) => {
  const ruser = req.user;
  await User.findByIdAndDelete(ruser._id)
    .then(() => {
      res.status(200).send("user delete succesfully");
    })
    .catch(() => {
      res.status(400).json({ error: "error" });
    });
});

// ************* All User ***************

router.get("/alluser", auth, async (req, res) => {
  try {
    const allUser = await User.find({});
    const Username = allUser.map((user) => {
      return { Username: user.Username, _id: user._id };
    });
    if (!allUser) {
      return res.status(400).json({ message: "User not availble" });
    }
    console.log(allUser);
    res.status(200).json({ user: Username });
  } catch (error) {
    res.status(400).json({ error: "There is some error" });
  }
});

module.exports = router;

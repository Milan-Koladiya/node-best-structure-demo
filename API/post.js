const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../auth/auth");

const postModel = require("../model/post");
const { addPost, allPost, deletePost, seatchPost } = require("../controllers/postControllers");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/post");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// ************* update Post ***************

router.patch("/updatepost/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const post = req.body;
    postModel
      .findOneAndUpdate({ _id: id, Postedby: user._id }, post)
      .then((data) => {
        if (!data) {
          return res.status(400).josn({ error: "data not found" });
        }
        res.status(200).send("update successfulyy");
      })
      .catch((err) => {
        res.status(200).send("error to update data");
      });
  } catch (error) {
    res.status(400).json({ error: "there is some error ocuured" });
  }
});

// ************* my Post ***************

router.get("/mypost", auth, async (req, res) => {
  try {
    const user = req.user;
    const post = await postModel.find({ Postedby: user._id });
    if (!post) {
      return res.status(400).send("no post available");
    }
    res.send(post);
  } catch (error) {
    return res.status(400).send("no post available");
  }
});

// ************* delete Post ***************

router.delete("/deletepost/:id",deletePost );

// ************* create Post ***************

router.post("/addPost", addPost);

// ************* All Post With Pagignation ***************
router.get("/allpost", allPost);

// ************* All Post With Pagignation ***************
router.get("/seatchPost", seatchPost);

module.exports = router;

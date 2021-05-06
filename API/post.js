const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../auth/auth");

const postModel = require("../model/post");
const { addPost, allPost, deletePost, searchPost, myPost, updatePost } = require("../controllers/postControllers");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/post");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


router.patch("/updatepost/:id", updatePost );
router.get("/mypost", myPost);
router.delete("/deletepost/:id",deletePost );
router.post("/addPost", addPost);
router.get("/allpost", allPost);
router.get("/searchPost", searchPost);

module.exports = router;

const postModel = require("../model/post");

exports.addPost = async (req, res) => {
    try {
        let post = req.body;
        if (!post.place_name || !post.country || !post.city || !post.radius || !post.weather ) {
          return res.status(400).json({ error: "Please fill all the field" });
        }
        // post.Postedby = req.user;
        new postModel(post).save((error, result) => {
          if (error) {
            throw new Error("error In save post");
          }
          res.status(200).json({ success: "Post added successfully"});
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.allPost = async (req, res) => {
    let qpage = req.query.page;
    const pages = qpage * 9 - 9;
    try {
      await postModel
        .find()
        .skip(pages)
        .limit(9)
        .sort("createdAt")
        .then((data) => {
          postModel
            .find()
            .countDocuments()
            .then((num) => {
              res.status(200).send({ doc: num, data: data });
            });
        });
    } catch (error) {
      res.status(400).json({ error: "Error in fetch data" });
    }
}

exports.deletePost = async (req, res) => {
    try {
      const id = req.params.id;
      postModel
        .findByIdAndDelete(id)
        .then((data) => {
            if (data == null) {
                throw new Error("Id is invalid");
            } 
            return res.status(200).json({ success: "post delete success" });
        })
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  }

  exports.seatchPost = async (req, res) => {  
    try {
        const searchString = req.query.search
        postModel.find({ $or: [{weather: searchString}, {city: searchString}, {place_name: searchString}]})
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }
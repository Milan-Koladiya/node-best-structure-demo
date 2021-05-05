const postModel = require("../model/post");

exports.addPost = async (req, res) => {
  try {
    let post = req.body;
    if (
      !post.place_name ||
      !post.country ||
      !post.city ||
      !post.radius ||
      !post.weather
    ) {
      return res.status(400).json({ error: "Please fill all the field" });
    }
    // post.Postedby = req.user;
    new postModel(post).save((error, result) => {
      if (error) {
        throw new Error("error In save post");
      }
      res.status(200).json({ success: "Post added successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    postModel.findByIdAndDelete(id).then((data) => {
      if (data == null) {
        throw new Error("Id is invalid");
      }
      return res.status(200).json({ success: "post delete success" });
    });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

exports.searchPost = async (req, res) => {
  try {
    const searchString = req.query.search;
    const sortField = req.query.sort;
    let qpage = req.query.page;
    const pages = qpage * 9 - 9;

    let searchRegEX;
    let sort;
    if (searchString) {
      searchRegEX = new RegExp(searchString, "i");
      var searchLog = {
        $or: [
          { weather: searchRegEX },
          { city: searchRegEX },
          { place_name: searchRegEX },
        ],
      };
    }
    if (sortField) {
        if(sortField == "weather") {
            sort = {"weather": 1};
        }
        if(sortField == "country") {
            sort = {"country": 1};
        }
        if(sortField == "city") {
            sort = {"city": 1};
        }
    //   var sortLog = { sort: { sortField } };
    }
    console.log("Sorting -- ", sort);
    const searchPost = await postModel
      .find(searchLog)
      .skip(parseInt(pages))
      .limit(9)
      .sort(sort);
      return res.status(200).json({ doc: searchPost.length, data: searchPost })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

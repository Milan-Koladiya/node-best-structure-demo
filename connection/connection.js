const mongoose = require("mongoose");
const connectionURL = process.env.CONNECTION_URL

const connection = mongoose
  .connect(
    connectionURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connecticon successfully");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = connection;

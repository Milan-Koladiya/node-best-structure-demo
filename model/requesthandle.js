const mongoose = require("mongoose");

const connection = require("../connection/connection");

const requestSchema = new mongoose.Schema({
  Request_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  Request_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  Acceptance: {
    type: "number",
    default: 0,
    required: true,
  },
  Date: {
    type: Date,
  },
});

const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel;

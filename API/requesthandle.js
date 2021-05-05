const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const requestModel = require("../model/requesthandle");

// router.post("/request-send", async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(400).json({ message: "There is some error" });
//   }
//   const request = req.body;
//   if (!request.Request_by || !request.Request_to) {
//     return res.status(422).json({ message: "Please Fill all the information" });
//   }
//   request.Date = new Date();
//   const requestobj = new requestModel(request);
//   requestobj
//     .save()
//     .then(() => {
//       res.status(200).json({ message: "Request sended" });
//     })
//     .catch(() => {
//       res.status(400).send({ message: "Error to send data" });
//     });
// });

router.post("/follow", auth, async (req, res) => {
  try {
    const user = req.user;
    const request = req.body;
    if (!request.Request_by) {
      return res.status(204).send({ message: "Please provide an id" });
    }
    user.Followers.push(request);
    user
      .save()
      .then(() => {
        req.status(200).json({ message: "Request send succesfully" });
      })
      .catch(() => {
        req.status(400).send("there is some error");
      });
  } catch (error) {
    req.status(400).send("there is some error");
  }
});

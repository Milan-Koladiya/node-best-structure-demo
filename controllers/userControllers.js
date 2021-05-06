const User = require("../model/user");

exports.signUp = async (req, res) => {
    try {
      let user = req.body;
      const imagename = req.file.filename;
      user.avtar = imagename;
      if (!user.Username || !user.Emailid || !user.Password) {
        throw new Error("Please fill all the field");
      }
      console.log(user);
      const userFound = await User.findOne({ Username: user.Username });
  
      if (userFound) {
        return res.status(204).send({ errmessage: "Please fill all the field" });
      }
      await bcrypt.hash(user.Password, 8, (err, hash) => {
        user.Password = hash;
        const userData = new User(user);
        userData
          .save()
          .then(() => {
            // sendMail(user.Emailid)
            res.status(200).send("user signup succesfully");
          })
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  exports.logIn = async (req, res) => {
    const userlogin = req.body;
    if (!userlogin.Username || !userlogin.Password) {
      return res.status(400).json({ error: "Please fill all the field" });
    }
    const users = await User.findOne({ Username: userlogin.Username });
    if (!users) {
      return res.status(400).json({ error: "username invalid" });
    }
    const compare = await bcrypt.compare(userlogin.Password, users.Password);
    if (!compare) {
      return res.status(400).json({ error: "Password invalid" });
    }
    const token = jwt.sign({ _id: users._id }, "thisistoken", {
      expiresIn: "24h",
    });
    users.tokens.push({ token });
    await users.save();
    (users.tokens = []),
      (users.Password = ""),
      (users.avtar = ""),
      (users._id = "");
    res.status(200).send({
      token: token,
      user: users,
    });
  }
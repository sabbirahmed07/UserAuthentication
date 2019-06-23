const User = require("../models/user");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration/index");

signToken = user => {
  return JWT.sign(
    {
      iss: "bishudigital",
      sub: user._id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    //check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).send({ error: "Email is already exists" });
    }

    //create a new user
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password
      }
    });

    //save the user into db
    await newUser.save();

    //Generate a token
    const token = signToken(newUser);

    //Respond with a token
    res.status(200).json({
      token: token
    });
  },

  signIn: async (req, res, next) => {
    //Generate a token
    const token = signToken(req.user);
    res.status(200).json({ token });

    console.log("Successful login");
  },

  googleOAuth: async (req, res, next) => {
    //Generate a token
    console.log("req.user", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    //Generate a token
    console.log("req.user", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("i managed to get here");
    res.json({
      secret: "resource"
    });
  }
};

const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    gender:String,
    age: Number,
  },
  {
    versionKey: false,
  }
);
let userModel = new mongoose.model("user", userschema);
module.exports = { userModel };

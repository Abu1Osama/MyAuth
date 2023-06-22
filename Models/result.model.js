const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    typingSpeed: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Result = mongoose.model("result", resultSchema);

module.exports = Result;

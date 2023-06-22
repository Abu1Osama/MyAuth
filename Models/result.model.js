const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the result.
 *         userId:
 *           type: string
 *           description: ID of the user.
 *         accuracy:
 *           type: number
 *           description: Accuracy of the user.
 *         typingSpeed:
 *           type: number
 *           description: Typing speed of the user.
 */

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    typingSpeed: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = {Result};

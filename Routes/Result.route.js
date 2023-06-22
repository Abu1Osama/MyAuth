const express = require("express");
const resultRouter = express.Router();
const ResultModel = require("../Models/result.model");

resultRouter.get("/", async (req, res) => {
  try {
    const typingResults = await ResultModel.find();
    const sortedResults = typingResults.sort((a, b) => {
      if (a.accuracy > b.accuracy) return -1;
      if (a.accuracy < b.accuracy) return 1;
      if (a.typingSpeed < b.typingSpeed) return -1;
      if (a.typingSpeed > b.typingSpeed) return 1;
      return 0;
    });
    res.status(200).json(sortedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

resultRouter.post("/resultadd", async (req, res) => {
  try {
    const userId = req.user.userID;
    const { accuracy, typingSpeed } = req.body;
    const newResult = new ResultModel({
        userId: userId,
      accuracy,
      typingSpeed,
    });
    await newResult.save();
    res.status(200).json({ message: "Typing result created successfully", result: newResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {resultRouter};

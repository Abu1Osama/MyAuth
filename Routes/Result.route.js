const express = require("express");
const resultRouter = express.Router();
const ResultModel = require("../Models/result.model");

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: API endpoints for handling typing results
 */

/**
 * @swagger
 * /results:
 *   get:
 *     summary: Get all typing results
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: A list of typing results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /results/resultadd:
 *   post:
 *     summary: Add a typing result
 *     tags: [Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       200:
 *         description: Typing result created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   $ref: '#/components/schemas/Result'
 *       500:
 *         description: Internal Server Error
 */
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

module.exports = { resultRouter };

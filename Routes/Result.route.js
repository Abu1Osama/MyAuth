const express = require("express");
const resultRouter = express.Router();
const { Result } = require("../Models/result.model");
const { auth } = require("../Middlewere/Auth");

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: API endpoints for managing results
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewResult:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user.
 *         typingSpeed:
 *           type: number
 *           description: Typing speed of the user.
 *         accuracy:
 *           type: number
 *           description: Accuracy of the user.
 *     Result:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the result.
 *         userId:
 *           type: string
 *           description: ID of the user.
 *         typingSpeed:
 *           type: number
 *           description: Typing speed of the user.
 *         accuracy:
 *           type: number
 *           description: Accuracy of the user.
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           description: Email of the user.
 */

/**
 * @swagger
 * /results:
 *   get:
 *     summary: Get all results
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: Returns all results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       500:
 *         description: Internal Server Error
 *
 * /results/create:
 *   post:
 *     summary: Create a new result
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewResult'
 *     responses:
 *       200:
 *         description: Result created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: Internal Server Error
 *
 * /results/sortedresult:
 *   get:
 *     summary: Get sorted results by typing speed
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: Returns sorted results by typing speed
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
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

resultRouter.post("/create", auth, async (req, res) => {
  const { typingSpeed, accuracy } = req.body;
  try {
    const result = new Result({
      userId: req.user._id,
      typingSpeed,
      accuracy,
    });
    await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

resultRouter.get("/sortedresult", async (req, res) => {
  try {
    const sortedResults = await Result.find().sort({ typingSpeed: -1 });
    res.status(200).json(sortedResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { resultRouter };

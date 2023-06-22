const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

userRouter.get("/", (req, res) => {
  res.send("welcome");
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user/admin.
 *         email:
 *           type: string
 *           description: Email of the user/admin.
 *         password:
 *           type: string
 *           description: Password of the user/admin.
 *         age:
 *           type: integer
 *           description: Age of the user/admin.
 *         gender:
 *           type: string
 *           description: Gender of the user/admin.
 *     RegResult:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Message.
 *           example: User Registered Successfully.
 *     LogReq:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user/admin.
 *           example: albin@gmail.com.
 *         password:
 *           type: string
 *           description: Password of the user/admin.
 *           example: Albin123.
 *     LogResult:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Message.
 *           example: User logged in successfully.
 *         token:
 *           type: string
 *           description: Token.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user/admin
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegResult'
 *       500:
 *         description: Bad Request
 */
userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender, age } = req.body;
  try {
    const emailcheck = await userModel.findOne({ email });
    if (emailcheck) {
      res.status(400).send({ msg: "Email already used" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new userModel({
          name,
          email,
          password: hash,
          gender,
          age,
        });
        await user.save();
        res.status(200).send({ msg: "User registered successfully" });
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user/admin
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogReq'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogResult'
 *       500:
 *         description: Bad Request
 */
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.secret_code); // Corrected property name
          res.status(200).json({
            msg: "User logged in successfully",
            name: user.name,
            token: token,
          });
        } else {
          res.status(400).json({ msg: "Wrong credentials" });
        }
      });
    } else {
      res.status(400).json({ msg: "No user exists" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


module.exports = { userRouter };

const express = require("express");
const { connection } = require("./Config/db");
const { auth } = require("./Middlewere/Auth");
const { userRouter } = require("./Routes/User.route");
const { resultRouter } = require("./Routes/Result.route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use("/users", userRouter);

app.use(auth);

app.use("/results", resultRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});

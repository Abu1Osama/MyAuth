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

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Typing World',
    version: '1.0.0',
    description:
      'This is a Typing World API application made with Express. It retrieves data from Typing World-BACKENED.',
    contact: {
      name: 'Typing World',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:7870',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

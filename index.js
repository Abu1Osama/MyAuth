const express=require("express")
const { connection } = require("./Config/db")
const { auth } = require("./Middlewere/Auth")
const { userRouter } = require("./Routes/User.route")
const cors = require("cors")
const app = express()
app.use(express.json())
require("dotenv").config()



// app.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for Authentication',
      version: '1.0.0',
      description:
        'This is a Authentication API application made with Express. It retrieves data from Auth-BACKENED.',
      contact: {
        name: 'BOLT',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:7913',
        description: 'Development server',
      },
    ],

    components:{
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'  
        }
      }
    }
  };

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./Routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



  


app.use(express.json())
app.use(cors())

//Authentication user/admin
app.use("/users",userRouter)



// User Authorization
app.use(auth)

//CRUD Operation (productRoute)








app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running on port ${process.env.port} `)
})


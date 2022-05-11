require('dotenv').config()
const express=require('express');
const app = express()
const cors = require("cors")
const connection = require('./db');
connection()

// const  auth= require('./route/auth')
const port = process.env.PORT || 8080

// cors config 
app.use(cors()) 
app.use(express.json())  // json file getting

// Routes 
app.use("/auth", require("./Routes/user"));
app.use("/product", require("./Routes/product"));
app.use("/business", require("./Routes/businessInfo"));
app.use("/buyer", require("./Routes/buyer"));
app.use("/supplier", require("./Routes/supplier"));
app.use(("/sells"),require('./Routes/Sells'))

// server
app.listen(port,()=>{
    console.log(`server Running at Port ${port}`)
})
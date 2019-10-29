const express = require("express")
const bodyParser = require("body-parser")
productsRouter = require("./services/products")

require ("dotenv").config()
var Connection = require('tedious').Connection
var Request = require("tedious").Request

const connection = require("./db")

const server = express();


server.use(bodyParser.json())
server.use("/products",productsRouter)





console.log(process.env.USER);


const port = process.env.PORT || 3009

server.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})



require("dotenv").config()
const express = require("express")
const cors = require("cors");
const router = require("./router")
require("./connection")


const Server = express()
Server.use(cors())
Server.use(express.json())
Server.use(router)


const PORT = 4000 || process.env.PORT
Server.listen(PORT, () => {
    console.log(`Server Running Succesfully at port number ${PORT}`);

})


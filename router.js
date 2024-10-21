const express = require("express")
const router = new express.Router()
const controller = require("./controller/userController")

router.post("/register", controller.registerController)
router.post("/login", controller.logincontroller)

module.exports = router
const express = require("express")

const router = express.Router();

const routerHandler = require("../router_handler/user")

// 注册
router.post("/register", routerHandler.registerUser)

// 登录
router.post("/login", routerHandler.login)

module.exports = router;
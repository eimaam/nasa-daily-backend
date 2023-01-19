const express = require("express")
const router = express.Router()
const {signUp, signIn} = require("../controls/user")

router.route("/signup").post(signUp)
router.route("/signIp").post(signIn)

module.exports = router
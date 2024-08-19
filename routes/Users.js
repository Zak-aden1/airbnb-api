const express = require("express")
const { loginUser, registerUser } = require("../controllers/User")

const router = express.Router()

// login
router.post('/login', loginUser)

// sign-up
router.post('/register', registerUser)

module.exports = router
const User = require('../models/Users')
const jwt = require("jsonwebtoken")

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
  const {email, password } = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(401).json({error: error.message})
  }
}

// signup user
const registerUser = async function(req, res) {
  const {email, password, username} = req.body

  try {
    const user = await User.signup(email, password, username)

    const token = createToken(user._id)

    res.status(200).json({email, token })
  } catch (error) {
    res.status(422).json({error: error.message})
  }
}

module.exports = {
  registerUser, 
  loginUser
}
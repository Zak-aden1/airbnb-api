const User = require('../models/Users')

// login user
const loginUser = (req, res) => {
  res.json('login route')
}

// signup user
const signupUser = async function(req, res) {
  const {email, password, username} = req.body

  try {
    const user = await User.signup(email, password, username)
    res.status(200).json({email, user })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  signupUser, 
  loginUser
}
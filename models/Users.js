const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

// static sign up method
userSchema.statics.signup = async function (email, password, username) {
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('email already exists')
  }

  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password: hash, username})

  return user
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    
  },
  username: {
    type: String
  },
  password: {
    type: String,
    required: true,
  }
})

// static sign up method
userSchema.statics.signup = async function (email, password, username) {

  // validation
  if(!email || !password || !username) throw Error ("All fields must be filled")
  if(!validator.isEmail(email)) throw Error("email is invalid")
  if(!validator.isStrongPassword(password)) throw Error("password is too weak")
  if(!validator.matches(username, "^[a-zA-Z0-9_\.\-]*$")) throw Error("username is not valid")

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('email already exists')
  }

  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password: hash, username})

  return user
}


userSchema.statics.login = async function (email, password) {
    // validation
  if(!email || !password ) throw Error ("All fields must be filled")
  if(!validator.isEmail(email)) throw Error("email is invalid")
  if(!validator.isStrongPassword(password)) throw Error("password is too weak")
  const user = await this.findOne({ email })
  if (!user) throw Error('email doesn\t exist exists')

  const match = await bcrypt.compare(password, user.password)

  if (!match) throw Error("wrong password")

  return user
}



const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
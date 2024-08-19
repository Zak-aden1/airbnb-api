require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UsersRoutes = require("./routes/Users.js")

const app = express()

// middleware
app.use(cors({
  credentials: true,
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
}))
app.use(express.json())

app.use((req, res, next) => {
console.log({path: req.path, method: req.method})
  next()
})

// routes
app.use('/api/auth', UsersRoutes)

const port = process.env.PORT || 4000
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
    console.log('Connected to db & Listening on port ', process.env.PORT);
})
  })
  .catch((err) => {
    console.log("🚀 ~ err:", err)
  })
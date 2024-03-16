// package Imports
const express = require("express");
const dotenv = require("dotenv");
const cookieParser  = require('cookie-parser')

// file imports
const userRoutes = require("./routes/user.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const connectToDb = require("./db/connectToDB.js");

// variables
const app = express();
const port = process.env.PORT;

dotenv.config();

// middleware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

app.listen(port, () => {
  connectToDb();
  console.log(`Server is running on port ${port}`);
});

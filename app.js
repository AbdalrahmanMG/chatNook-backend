// package Imports
const express = require("express");
const dotenv = require("dotenv");

// file imports
const userRoutes = require("./routes/user.routes.js");
const connectToDb = require("./db/connectToDB.js");

// variables
const app = express();
const port = process.env.PORT;

dotenv.config();

// middleware
app.use(express.json())

app.use("/", userRoutes);

app.listen(port, () => {
  connectToDb();
  console.log(`Server is running on port ${port}`);
});

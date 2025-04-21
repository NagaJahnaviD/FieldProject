const express = require("express");
const app = express();
require("dotenv").config(); // process.env
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());

// DB connection
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  })
  .catch((err) => console.log("Error in DB connection", err));

// Import APIs
const facultyApp = require("./APIs/facultyApi");
const ttApp = require('./APIs/ttApi')


app.use(express.json()); // Middleware

// Connect API routes
app.use("/faculty-api", facultyApp);
app.use("/tt-api", ttApp)

// Error handler middleware (4 args)
app.use((err, req, res, next) => {
  console.log("Error in Express error handler:", err);
  res.status(500).send({ message: err.message });
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/porjectRoute");
const userRoute = require("./routes/userRoute");

// express app
const app = express();
// port
const port = process.env.PORT || 4000;

// middelWare
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoute);
// mongoDB
mongoose
  .connect(process.env.MONGO_UR)
  .then(() => {
    // Listen for request
    app.listen(port, () => {
      console.log(`Conected to mango ad listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

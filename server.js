require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const projectRoutes = require("./routes/porjectRoute");
const app = express();
// port
const PORT = process.env.PORT || 4000;

// middelWare
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// Routes
app.use("/api/projects", projectRoutes);
// mongoDB
mongoose
  .connect(process.env.MONGO_UR)
  .then(() => {
// Listen for request
    app.listen(PORT, () => {
      console.log(`Connected to mongo Listeing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



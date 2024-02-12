require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/porjectRoute");
const userRoutes = require("./routes/userRoute");

// express app
const app = express();

// port
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI ;

// middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get('/',(req,res)=>res.json({message:"hello"}))
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

// mongodb
mongoose.set("strictQuery", false); // optional
mongoose
  .connect(uri)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`connected to mongo and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

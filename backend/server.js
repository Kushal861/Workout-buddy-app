require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
// express app
const app = express();

// middleware
app.use(express.json()); // Call express.json() as a function

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// root route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to the Workout API. Use /api/workouts to access the workouts.",
  });
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Connected to db and Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;

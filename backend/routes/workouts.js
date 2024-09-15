// routes/workouts.js
const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// require auth for all routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);
// get all workouts
router.get("/", getWorkouts);

// get single workout
router.get("/:id", getWorkout);

// post new workout
router.post("/", createWorkout);

// delete workout
router.delete("/:id", deleteWorkout);

// update workout
router.patch("/:id", updateWorkout);

module.exports = router;

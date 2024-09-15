import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext(); // Corrected destructuring
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load: Number(load), reps: Number(reps) };

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
        console.log("New Workout Added");
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (error) {
      setError("An error occurred while adding the workout");
      console.error(error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label className={emptyFields.includes("title") ? "error" : ""}>
        Exercise Title
      </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "input-error" : ""}
      />

      <label className={emptyFields.includes("load") ? "error" : ""}>
        Load (in kg)
      </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "input-error" : ""}
      />

      <label className={emptyFields.includes("reps") ? "error" : ""}>
        Reps
      </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "input-error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;

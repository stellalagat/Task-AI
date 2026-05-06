import { useState, useEffect } from "react";
import api from "../api/axios";

const API = "http://localhost:7000/api/tasks";

const TaskApp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title,
        description,
      });

      setTasks((prev) => [res.data, ...prev]);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
        setLoading(false);
    } catch (error) {
      console.log(error);
         setLoading(false);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE COMPLETE
  const toggleTask = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? res.data : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ textAlign: "center" }}>My Tasks</h2>

      {/* INPUTS */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* ADD BUTTON */}
      <button
        onClick={addTask}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>

      {/* FILTER BUTTONS */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
<div style={{ marginTop: "20px", textAlign: "center" }}>
  {/* LOADING STATE */}
  {loading && <p>Loading tasks...</p>}

  {/* EMPTY STATE */}
  {!loading && filteredTasks.length === 0 && (
    <p>No tasks found</p>
  )}

  {/* TASK LIST */}
  {!loading &&
    filteredTasks.map((task) => (
      <div
        key={task._id}
        style={{
          background: "#f9f9f9",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          textAlign: "left",
        }}
      >
        <h3
          style={{
            margin: 0,
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </h3>

        <p style={{ margin: "5px 0 10px" }}>
          {task.description}
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => toggleTask(task._id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      </div>
    ))}
</div>
    </div>
    );
};

export default TaskApp;

     
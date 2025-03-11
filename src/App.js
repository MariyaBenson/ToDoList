import { useReducer, useState, useEffect, useContext, useRef } from "react";
import { taskReducer } from "./reducer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import "./styles.css";

function App() {
  const { darkMode } = useContext(ThemeContext);

  // Load tasks from localStorage when the app starts
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [filter, setFilter] = useState("all");
  const isInitialRender = useRef(true);

  // ✅ Save tasks to localStorage & show alert only when tasks update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      alert("Task list updated!");
    }
  }, [tasks]);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="container">
        <h1>Task Manager</h1>
        <ThemeToggle />

        <TaskForm dispatch={dispatch} />

        {/* ✅ Filter Buttons with Active Class */}
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "pending" ? "active-filter" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <TaskList tasks={tasks} dispatch={dispatch} filter={filter} />
      </div>
    </div>
  );
}

export default function RootApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

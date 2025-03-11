import { useState, useRef, useEffect } from "react";

const TaskForm = ({ dispatch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef(); // ✅ useRef to reference input field

  // ✅ Auto-focus input field when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    dispatch({ type: "ADD_TASK", title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={addTask}>
      <input
        ref={inputRef} // ✅ Set ref for input field
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

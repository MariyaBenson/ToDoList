import { memo, useCallback, useState } from "react";

const TaskItem = memo(({ task, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const toggleTask = useCallback(() => {
    dispatch({ type: "TOGGLE_TASK", id: task.id });
  }, [dispatch, task.id]);

  const deleteTask = useCallback(() => {
    dispatch({ type: "DELETE_TASK", id: task.id });
  }, [dispatch, task.id]);

  const saveEdit = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    dispatch({ type: "UPDATE_TASK", id: task.id, newTitle, newDescription });
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <button onClick={saveEdit}>Save</button> 
        </div>
      ) : (
        <>
          <span className={`task-text ${task.completed ? "completed" : ""}`}>
            <strong>{task.title}</strong> - {task.description}
          </span>
          <div>
            <button onClick={toggleTask}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={deleteTask} style={{ backgroundColor: "red" }}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
});

export default TaskItem;

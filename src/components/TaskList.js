import { useMemo } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, dispatch, filter }) => {
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
    );
  }, [tasks, filter]);

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} dispatch={dispatch} />
        ))
      )}
    </div>
  );
};

export default TaskList;

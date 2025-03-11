export const taskReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return [...state, { id: Date.now(), title: action.title, description: action.description, completed: false }];
  
      case "TOGGLE_TASK":
        return state.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        );
  
      case "DELETE_TASK":
        return state.filter((task) => task.id !== action.id);
  
      case "UPDATE_TASK":
        return state.map((task) =>
          task.id === action.id ? { ...task, title: action.newTitle, description: action.newDescription } : task
        );
  
      default:
        return state;
    }
  };
  
const initialState = {
    todos: [],
  };

  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          todos: [...state.todos, action.payload],
        };
      case 'TOGGLE_TODO':
        return {
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        };
      default:
        return state;
    }
  };
  
  export default todoReducer

  
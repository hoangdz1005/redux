
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo } from '../actions/index';

const TodoList = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Todo List App</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

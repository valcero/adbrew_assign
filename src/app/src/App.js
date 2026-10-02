import React, { useState, useEffect } from 'react';
import './App.css';

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/todos/');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await fetch('http://localhost:8000/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTodo }),
      });
      setNewTodo('');
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">✨ My Tasks ✨</h1>
        
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo-input"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            autoComplete="off"
          />
          <button type="submit" className="todo-button">Add Task</button>
        </form>

        <div className="todo-list-container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">No tasks yet. You're all caught up!</div>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo._id} className="todo-item">
                  <span className="todo-text">{todo.description}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

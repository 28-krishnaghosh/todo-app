import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const updateTodo = (id, updatedText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: updatedText } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <TodoForm addTodo={addTodo} />
        <input 
          type="text" 
          placeholder="Search todos" 
          value={searchTerm} 
          onChange={handleSearch}
          className="search-input"
        />
        <select value={filter} onChange={handleFilterChange} className="filter-select">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </header>
      <TodoList 
        todos={filteredTodos} 
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo} 
        toggleComplete={toggleComplete} 
      />
    </div>
  );
};

export default App;

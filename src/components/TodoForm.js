import React, { useState } from 'react';

const categories = ['General', 'Work', 'Personal'];

const TodoForm = ({ addTodo }) => {
  const [todoText, setTodoText] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      addTodo({
        text: todoText,
        completed: false,
        category: category
      });
      setTodoText(''); // Clear the text input
      setCategory('General'); // Reset to default category
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={todoText} 
        onChange={(e) => setTodoText(e.target.value)} 
        placeholder="Add a todo" 
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        className="category-select"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;

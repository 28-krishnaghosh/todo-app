import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleUpdate = () => {
    if (newText.trim()) {
      updateTodo(todo.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <input 
          type="text" 
          value={newText} 
          onChange={(e) => setNewText(e.target.value)} 
        />
      ) : (
        <span 
          className={todo.completed ? 'completed' : ''}
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.text}
        </span>
      )}
      <span className="category-label">{todo.category}</span>
      {isEditing ? (
        <button className="edit" onClick={handleUpdate}>Save</button>
      ) : (
        <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;

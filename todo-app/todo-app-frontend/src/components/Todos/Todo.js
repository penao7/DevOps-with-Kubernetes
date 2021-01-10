import React from 'react';
import './styles.scss';

const Todo = ({ content, id, handleDelete }) => {
  return (
    <div className="todo">
      <li>{content}</li>
      <button className="deleteButton" onClick={() => handleDelete(id)}>delete</button>
    </div>
  )
};

export default Todo;

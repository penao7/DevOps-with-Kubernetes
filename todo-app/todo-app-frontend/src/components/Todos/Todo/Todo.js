import React from 'react';
import { MdDone } from 'react-icons/md'
import { AiOutlineDelete } from "react-icons/ai";
import './styles.scss';

const Todo = ({ content, id, handleDelete, markTodoDone }) => {
  return (
    <div className="todoContainer">
      <div className="wrapContainer">
        <div>
          <li>{content}</li>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '5px', marginLeft: '5px', paddingLeft: '5px' }}>
            <button className="deleteButton" onClick={() => handleDelete(id)}>< AiOutlineDelete /> </button>
          </div>
          <div>
            <button className="successButton" onClick={() => markTodoDone(id)}>< MdDone /></button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Todo;

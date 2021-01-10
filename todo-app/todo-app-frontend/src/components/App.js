import React, { useState } from 'react';
import './App.scss';
import MessageHandler from './MessageHandler';
import DailyImage from './DailyImage';

import TodoList from './Todos/TodoList';
import TodoAdd from './Todos/TodoForm';

const Main = () => {

  const [message, setMessage] = useState({
    message: '',
    error: false
  });

  const notify = (error, message) => {
    setMessage({ message: message, error: error })
  };

  return (
    <div className="container">
      <DailyImage />
      <MessageHandler message={message} setMessage={setMessage} />
      <TodoAdd notify={notify} />
      <TodoList notify={notify} />
    </div>
  )

};

export default Main;

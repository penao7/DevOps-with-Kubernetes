import React, { useState } from 'react';
import './App.scss';
import MessageHandler from './MessageHandler';
import DailyImage from './DailyImage';

import TodoList from './Todos/TodoList';
import TodoForm from './Todos/TodoForm/TodoForm';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { DELETE_TODO, EDIT_TODO } from '../graphql/mutations';
import { ALL_TODOS } from './../graphql/queries';

const Main = () => {

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: ALL_TODOS }],
    onError: (err) => {
      notify(true, err.graphQLErrors[0].message)
    },
  });

  const [editTodo] = useMutation(EDIT_TODO, {
    refetchQueries: [{ query: ALL_TODOS }],
    onError: (err) => {
      notify(true, err.graphQLErrors[0].message)
    }
  })

  const [message, setMessage] = useState({
    message: '',
    error: false
  });

  const todos = useQuery(ALL_TODOS);

  const trimLongContent = (content) => {
    if (content.length > 10) {
      return `${content.substring(0, 20)}...`;
    };
    return content;
  };

  const notify = (error, message) => {
    setMessage({ message: message, error: error })
  };

  const DoneTodo = ({ todo }) => {
    return (
      <div style={{ border: '1px solid black', borderRadius: '10px', marginBottom: '5px', padding: '5px' }}>
        <li>{todo.content}</li>
        <li>{todo.markedDoneAt}</li>
      </div>
    )
  };

  const markTodoDone = async (id) => {

    try {
      const result = await editTodo({ variables: { id: id, done: true } });
      if (result && result.data.editTodo && result.data.editTodo.content) {
        notify(false, `Todo "${trimLongContent(result.data.editTodo.content)}" marked done succesfully`);
      } else {
        notify(true, `Cannot mark todo: todo not found`);
      }
    } catch (err) {
      notify(true, `unexpected error`);
    }
  };

  if (todos.loading || !todos.data) {
    return <div>loading...</div>
  }

  return (
    <div className="container">
      <div className="mainContainer">
        <div className="leftContainer">
        </div>
        <div className="middleContainer">
          <DailyImage />
          <MessageHandler message={message} setMessage={setMessage} />
          <TodoForm notify={notify} trimLongContent={trimLongContent} />
          <TodoList
            notify={notify}
            trimLongContent={trimLongContent}
            markTodoDone={markTodoDone}
            deleteTodo={deleteTodo}
            todos={todos}
          />
        </div>
        <div className="rightContainer">
          <div className="doneTodos">
            {todos.data.allTodos.filter(todo => todo.done === true).map(todo => (
              <div key={todo.id}>
                <DoneTodo todo={todo} />
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )

};

export default Main;

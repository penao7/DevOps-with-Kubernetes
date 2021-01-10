import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_TODOS } from '../../graphql/queries';
import { DELETE_TODO } from '../../graphql/mutations';
import Todo from './Todo';
import './styles.scss';

const TodoList = ({ notify }) => {

  const todos = useQuery(ALL_TODOS);

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: ALL_TODOS }],
    onError: (err) => {
      notify(true, err.graphQLErrors[0].message)
    },
  });

  const handleDelete = async (id) => {
    try {
      const result = await deleteTodo({ variables: { id: id } });
      if (result && result.data.deleteTodo && result.data.deleteTodo.content) {
        notify(false, `Todo "${result.data.deleteTodo.content}" deleted`);
      } else {
        notify(true, `Cannot delete todo: todo not found`);
      }
    } catch (err) {
      notify(true, `unexpected error`);
    }
  }

  if (todos.loading || !todos.data) {
    return <div>loading...</div>
  }

  return (
    <div className="todoList">
      {
        todos.data.allTodos.map(todo => (
          <div key={todo.id}>
            <Todo content={todo.content} id={todo.id} handleDelete={handleDelete} />
          </div>
        ))
      }
    </div>
  )
};

export default TodoList;


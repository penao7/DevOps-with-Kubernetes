import React from 'react';
import Todo from './Todo/Todo';
import './styles.scss';

const TodoList = ({ notify, trimLongContent, markTodoDone, deleteTodo, todos }) => {

  const handleDelete = async (id) => {
    try {
      const result = await deleteTodo({ variables: { id: id } });
      if (result && result.data.deleteTodo && result.data.deleteTodo.content) {
        notify(false, `Todo "${trimLongContent(result.data.deleteTodo.content)}" deleted succesfully`);
      } else {
        notify(true, `Cannot delete todo: todo not found`);
      }
    } catch (err) {
      notify(true, `unexpected error`);
    }
  }

  return (
    <div className="todoList">
      {
        todos.data.allTodos.filter(todo => todo.done === false).map(todo => (
          <div key={todo.id}>
            <Todo 
              content={todo.content} 
              id={todo.id} handleDelete={handleDelete}
              markTodoDone={markTodoDone}
            />
          </div>
        ))
      }
    </div>
  )
};

export default TodoList;


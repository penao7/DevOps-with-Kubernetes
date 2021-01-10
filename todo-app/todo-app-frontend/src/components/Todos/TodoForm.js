import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TODO } from '../../graphql/mutations';
import { ALL_TODOS } from '../../graphql/queries';
import * as Yup from 'yup';

import { useFormik } from 'formik';

const TodoForm = ({ notify }) => {

  const TodoSchema = Yup.object().shape({
    todo: Yup.string()
      .min(4, 'Todo has to be longer than 4 characters')
      .max(140, 'Maxium lenght for a todo is 140 characters!')
      .required('Todo cannot be empty')
  });

  const initialValues = {
    todo: ''
  };

  const onSubmit = async (values, { resetForm }) => {
    const result = await createTodo({ variables: { content: values.todo } })
    if (result && result.data.createTodo) {
      notify(false, `Todo "${result.data.createTodo.content}" created succesfully`)
      resetForm({});
    };
  };

  const formik = useFormik({
    initialValues,
    validationSchema: TodoSchema,
    onSubmit,
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: ALL_TODOS }],
    onError: (err) => {
      notify(true, err.graphQLErrors[0].message)
    },
  });

  return (

    <form onSubmit={formik.handleSubmit}>
      <div className="rowContainer">
        <input
          className={`${formik.errors.todo ? 'inputError' : 'inputSuccess'}`}
          id="todo"
          name="todo"
          value={formik.values.todo}
          onChange={(e) => formik.handleChange(e)}
          onBlur={formik.handleBlur}
          type="text"
          maxLength="140"
          placeholder="todo"
        />
        <div className="buttonContainer">
          <button className="inputButton" type="submit">create todo</button>
        </div>
      </div>
      {formik.touched.todo && formik.errors.todo ? (
        <div style={{ display: 'flex', margin: '5px', color: 'red', justifyContent: 'center' }}>
          {formik.errors.todo}
        </div>
      ) : null}
    </form>
  )
};


export default TodoForm;

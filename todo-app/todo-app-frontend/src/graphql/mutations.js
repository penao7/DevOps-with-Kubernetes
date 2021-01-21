import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation addTodo($content: String!) {
    createTodo(
      content: $content,
    ) {
      content
      important
      done
      createdAt
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(
      id: $id
    ) {
      content
      id
    }
  }
`

export const EDIT_TODO = gql`
  mutation editTodo($id: ID!, $done: Boolean) {
    editTodo(
      id: $id
      done: $done
    ) {
      id
      content
      done
      important
    }
  }

`
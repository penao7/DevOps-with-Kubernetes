import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation addTodo($content: String!) {
    createTodo(
      content: $content,
    ) {
      content
      important
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
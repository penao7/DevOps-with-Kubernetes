# TodoAPP GraphQL

Used to manage mongodb for todo-app

## Variables needed for deploying

Credentials are set by using [secrets](https://kubernetes.io/docs/concepts/configuration/secret/) and [sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)

```
NODE_ENV = <defaultly set as production>

MONGO_DBINIT_ROOT_PASSWORD = <mongo root password>

TODO_USER_USERNAME = <username for todo-app db>

TODO_USER_PASSWORD = <password for todo-app db>
```

## Queries

Get all todos

```graphql
query {
  allTodos {
    content
    important
    id
    done
    createdAt
    markedDoneAt
  }
}
```

## Mutations

Add todo

```graphql
mutation { 
  createTodo(
    content: "buy milk"
  ) {
      content
      important
      done
      createdAt
   }
}
```

Delete todo

```graphql
mutation {
  deleteTodo(
    id: 507f1f77bcf86cd799439011
  ) {
      content
      id
   }
}
```

Edit todo

```graphql
mutation {
  editTodo(
    id: 507f1f77bcf86cd799439011
    done: true
  ) {
      id
      content
      done
      important
   }
}
```

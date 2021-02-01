# TodoAPP GraphQL

Used to manage database queries and send messages trough [NATS](https://nats.io/) for todo-app. By default will be available at `http://localhost:4000` endpoint.

## Requirements

- [NATS](https://nats.io/) is required to be installed to the cluster.

```bash
$ helm repo add nats https://nats-io.github.io/k8s/helm/charts/
  ...
$ helm repo update
...
$ helm install my-nats nats/nats
```

- Working database connection (e.g with [mongodb](/todo-app/todo-app-mongodb))

## ENV

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

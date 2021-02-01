# Todo-MongoDB

Provides database for Todo-App. Initially creates `todo-app` database with secure user using `docker-entrypoint.d` volume path for a setup script stored into a [configmap](/todo-app/todo-app-mongodb/manifests/configmap.yaml).

## Requirements

- Persistent volume attached to the persistent volume claim inside the [statefulset manifest](/todo-app/todo-app-mongodb/manifests/ss.yaml)
- ENV variables (see below)
- [configmap](/todo-app/todo-app-mongodb/manifests/configmap.yaml) for initial database setup (ENV required)

## ENV

These are deployed using secrets.

```
MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD
TODO_USERNAME
TODO_PASSWORD
```

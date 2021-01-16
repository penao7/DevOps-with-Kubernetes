## TodoAPP GraphQL

Used to manage mongodb for todo-app

### Variables needed for deploying

Credentials are set by using [secrets](https://kubernetes.io/docs/concepts/configuration/secret/) and [sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)

```
NODE_ENV = <defaultly set as production>

MONGO_DBINIT_ROOT_PASSWORD = <mongo root password>

TODO_USER_USERNAME = <username for todo-app db>

TODO_USER_PASSWORD = <password for todo-app db>
```



# PingPong-app

Increases a counter on every GET request on '/' endpoint and stores the value into a PostgreSql database.

Connection to the database is made internally inside the cluster using headless service.

## ENV

required environmental variables which are provided by using secrets

`POSTGRES_PASSWORD`

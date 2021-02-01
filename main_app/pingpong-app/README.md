# PingPong-app

Increases a counter on every GET request on '/' endpoint and stores the value into a PostgreSql database.

Connection to the database is made internally inside the cluster using headless service.

## Usage

The image for this app can be fetched from DockerHub using name

```
penao7/pingpong
```

To run pingpong-app in a cluster together with other pods, it is required to apply the following manifests

```
horizontalpodautoscaler.yaml
internal-service.yaml
deployment.yaml
```
and then the app will be available inside the cluster using http://pingpong endpoint.


## ENV

required environmental variables which are provided by using secrets

`POSTGRES_PASSWORD`

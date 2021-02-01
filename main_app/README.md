# Main application

Main application consists of three micro services: date, hash and pingpong.

[Date-app](/main_app/splitted-random-string-app/date) will write a current date into a file, which is stored into a shared volume with [Hash-app](/main_app/splitted-random-string-app/hash). Hash-app then reads the output from the file, which is updated every 5 secods, and combines generated hash and date as a output for the client. Additionally Hash-app will make use of postgresql and get the current `pong` count from the database which is provided by [pingpong-app](/main_app/pingpong).

## ENV

These are provided by using secrets

```
POSTGRES_PASSWORD
```

## Volumes

More information about required volumes are documented [here](https://github.com/penao7/DevOps-with-Kubernetes/blob/master/main_app/postgres/README.md)

## Usage

The app can be deployed to the cluster using kustomize

```
$ kubectl apply -k .
```

which will apply all the required manifests to run the app locally. 

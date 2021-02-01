# Main application

Main application consists of three micro services: [date](/main_app/date), [hash](/main_app/hash) and [pingpong](/main_app/pingpong-app).

[Date-app](/main_app/date) will write the current date into a `date.txt` file every five seconds, which is stored into a volume shared with [Hash-app](/main_app/hash). Hash-app then reads the file and generates a hash and combines the date and the hash as a output for the client. Additionally Hash-app will get the current `pong` count from `http://pingpong` endpoint provided by [pingpong-app](/main_app/pingpong-app).

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

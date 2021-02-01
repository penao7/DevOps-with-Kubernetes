# Main application

Main application consists of three micro services: [date](/main_app/date), [hash](/main_app/hash) and [pingpong](/main_app/pingpong-app).

[Date](/main_app/date) will write the current date into a `date.txt` file every five seconds, which is stored into a volume shared with [Hash-app](/main_app/hash). 

[Pingpong](/main_app/pingpong-app) provides current `pong` count as a JSON-object at `http://pingpong` endpoint.

[Hash](/main_app/hash) then gets the date from the `date.txt` file, generates a hash and fetches the current `pong` count from the `http://pingpong` endpoint. Finally all the information is combined and rendered to `http://localhost:3500` endpoint.

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

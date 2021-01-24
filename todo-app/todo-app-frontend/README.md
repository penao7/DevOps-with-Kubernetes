## Frontend for TodoApp

UI for Todo CRUD

Dailyimage
MongoDB for saving Todos via GraphQL

### Usage

Intented to be deployed with kubernetes using deployment.yaml from manifests folder, which builds the frontend and serves it with nginx in a port 80.

### Variables for docker build

```
REACT_APP_API_URL = <GraphQL API URL>
```

kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://raw.githubusercontent.com/argoproj/argo-rollouts/stable/manifests/install.yaml

$helm repo add nats https://nats-io.github.io/k8s/helm/charts/
$ helm repo update
...
$ helm install my-nats nats/nats

kubectl delete deployments.apps todo-broadcaster
docker rmi penao7/todo-broadcaster
docker build -t penao7/todo-broadcaster .
docker push penao7/todo-broadcaster
kubectl apply -f manifests/deployment.yaml

kubectl delete deployments.apps todo-graphql
docker rmi penao7/todo-graphql
docker build -t penao7/todo-graphql .
docker push penao7/todo-graphql
kubectl apply -f manifests/linkerd-deployment.yaml

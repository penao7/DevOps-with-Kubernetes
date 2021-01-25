kubectl delete ksvc pingpong-app
docker rmi penao7/pingpongv3
docker build -t penao7/pingpong .
docker push penao7/pingpong
kubectl apply -f manifests/serverless.yaml

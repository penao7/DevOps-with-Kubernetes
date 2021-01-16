#!/bin/bash

GKE_CLUSTER=dwk-cluster
GKE_ZONE=europe-north1-b

gcloud container clusters create $GKE_CLUSTER --zone $GKE_ZONE
gcloud container clusters get-credentials $GKE_CLUSTER --zone $GKE_ZONE
kubectl apply -f ~/.kube/master.yaml
kubectl apply -f ~/.kube/controller.yaml




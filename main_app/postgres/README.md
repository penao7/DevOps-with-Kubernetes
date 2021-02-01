# Pingpong PostgresQL

This pod is deployed as a statefulset using headless service.
Uses port `5432` by default. 

Because of the headless service it is possible to connect to the database internally inside cluster by using DNS name:

```
db-0.postgres-svc.pingpongdatehash.svc.cluster.local
```

## ENV

Required environmental variables

`POSTGRES_DB <by default pingpong>`
`POSTGRES_PASSWORD`

## Volumes

Requires [persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) to be assigned for the persistent volume claim.

These manifest can be used as a template for the volumes:

[Persistent volume](/main_app/manifests/persistentvolume.yaml)

[Persistent volume claim](/main_app/manifests/persistentvolumeclaim.yaml)

Path defined in the persistent volume
```yaml
...
  local:
    path: /tmp/kube
...
```
must be available in the node before using the manifest. This can simply be done using command
```
$ docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```

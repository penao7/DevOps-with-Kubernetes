# Pingpong PostgresQL

This pod is deployed as a statefulset using headless service.
Uses port `5432` by default. 

## ENV

Required environmental variables

`POSTGRES_DB <by default pingpong>`
`POSTGRES_PASSWORD`

## Volumes

Requires PV to be assigned for the PVC

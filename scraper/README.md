# Web Scraper

Copies contents of a web page and serves them locally

## Usage

First step is to apply required manifests using Kustomize:

`
$ kubectl apply -k .
`

```console
$ kubectl apply -k .
serviceaccount/scraper-controller-account created
clusterrole.rbac.authorization.k8s.io/scraper-controller-role created
clusterrolebinding.rbac.authorization.k8s.io/scraper-rolebinding created
deployment.apps/scraper created
```

Secondly fill in to DummySite.yaml the url to be scraped and apply. Default value is `http://www.example.com`

```console
$ kubectl apply -f manifests/DummySite.yaml
webscraper.stable.dwk/web-scraper created
```

Check logs from the web-scraper pod:

```console
$ kubectl logs scraper-77c94cf96c-dkl5v
server running at 6000
deleting previous webscrape files...
scraping url: http://www.example.com
previous webscrape files deleted!
Website succesfully scraped! Page is available at http://localhost:6000
cleaning up... deleting web-scraper
web-scraper succesfully deleted
```

Controller cleans up automatically created DummySite from cluster.

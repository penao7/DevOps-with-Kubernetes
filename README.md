# Devops with Kubernetes

These are application made for [Devops with Kubernetes](https://devopswithkubernetes.com) course. In this course I built three different projects. Secrets for the applications are mainly handled by using [Sealed secrets](https://github.com/bitnami-labs/sealed-secrets) and monitoring using [Prometheus](https://prometheus.io/) together with [Grafana](https://grafana.com/).

## [The Main App](main_app)

Consists of Date & Hash and PingPong & postgresql pods

Date provides every 5 seconds updating Date string and saves it to a file.

PingPong increments counter on every GET-request and stores the value to a psql database.

Hash brings all the information together from both the date file and from the database. Additionally it 
creates a new hash every time it detects a change in the date file.

## [Todo App "The Project"](/todo-app)

Main features:

- Managing todos with CRUD operations
- Broadcasting messages from CRUD operations to a Telegram group
- Automatically changing image every day
- Workflow through GitHub actions to Google Kubernetes Engine
  - new namespace created for every branch e.g development
  - when the branch is merged with production and deleted from GitHub, the environment is deleted from the cluster aswell

## [Web Scraper](/scraper)

This application makes use of DIY CRD & Controller which are used to scrape web pages from url's. When a new [DummySite](/scraper/manifests/DummySite.yaml) resource is applied, the application catches it from a [JSONStream](https://www.npmjs.com/package/JSONStream) and serves the scraped page at `http://localhost:6000` by default. 

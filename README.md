# Devops with Kubernetes

These are application made for [Devops with Kubernetes](https://devopswithkubernetes.com) course. In this course I built three different projects. Secrets for the applications are mainly handled by using [Sealed secrets](https://github.com/bitnami-labs/sealed-secrets) and monitoring using [Prometheus](https://prometheus.io/) together with [Grafana](https://grafana.com/).

## [The Main App](main_app)

Consists of Date & Hash and PingPong & postgresql pods

Date provides every 5 seconds updating Date string and saves it to a file.

PingPong increments counter on every GET-request and stores the value to a psql database.

Hash brings all the information together from both the date file and from the database. Additionally it 
creates a new hash every time it detects a change in the date file.

## [Todo App "The Project"](/todo-app)

This application used 5 different pods to make the app whole.

[DailyImage](/todo-app/todo-app-dailyimage) handles fetching new image from [picsum](https://picsum.photos) every midnight using cronjob and serves it for frontend at /dailyimage endpoint.

Backend for this application is made using [MongoDB](todo-app/todo-app-mongodb) as a statefulset and [GraphQL](todo-app/todo-app-graphql) as a normal deployment. Upon initialization MongoDB runs a script which creates database and secure user for GraphQL to use. 

[Broadcaster](todo-app/todo-app-broadcaster) receives payloads from GraphQL trough [NATS](https://nats.io/) and forwards them as a messages to a predefined [Telegram](https://telegram.org/) group. 

[Frontend](todo-app/todo-app-frontend) is implemented using React and styled with [Sass](https://sass-lang.com/). The page is served using nginx and at the same time it works as a reverse proxy for the dailyimage endpoint. The GraphQL requests are directed to /api endpoint.

## [Web Scraper](/scraper)

This application makes use of DIY CRD & Controller which are used to scrape web pages from url's. When a new [DummySite](/scraper/manifests/DummySite.yaml) resource is applied, the application catches it from a [JSONStream](https://www.npmjs.com/package/JSONStream) and serves the scraped page at `http://localhost:6000` by default. 

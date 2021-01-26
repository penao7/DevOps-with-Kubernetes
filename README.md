# Devops with Kubernetes

These are application made for [Devops with Kubernetes](https://devopswithkubernetes.com) course. I this course I built three different projects:

## The Main App

Consists of Date & Hash and PingPong & postgresql pods

Date provides every 5 seconds updating Date string and saves it to a file.

PingPong increments counter on every GET-request and stores the value to a psql database.

Hash brings all the information together from both the date file and from the database. Additionally it 
creates a new hash every time it detects a change in the date file.

## Todo App "The Project"

This application used 5 different pods to make the app whole.

DailyImage handles fetching new image from [picsum](https://picsum.photos) every midnight using cronjob and serves it for frontend at /dailyimage endpoint.

Backend for this application is made using MongoDB as a statefulset and GraphQL as a normal deployment. Upon initialization MongoDB runs a script which creates database and secure user for GraphQL to use. 

Broadcaster receives payloads from GraphQL trough [NATS](https://nats.io/) and forwards them as a messages to a predefined [Telegram](https://telegram.org/) group. 

Frontend is implemented using React and styled with [Sass](https://sass-lang.com/). The page is served using nginx and at the same time it works as a reverse proxy for the dailyimage endpoint. The GraphQL requests are directed to /api endpoint.

## Web Scraper

This application makes use of DIY CRD & Controller which are used to scrape web pages from url's. When a new [DummySite](/scraper/manifests/DummySite.yaml) resource is applied, the application catches it from a [JSONStream](https://www.npmjs.com/package/JSONStream) and serves the scraped page at `http://localhost:6000` by default. 

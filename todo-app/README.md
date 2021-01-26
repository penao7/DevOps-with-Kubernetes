# Todo-App

This app was used at least for the following:
  - Managing todos with CRUD operations
  - Making use of volumes, ingresses, services and all the other functions Kubernetes had to offer
  - Testing different kinds of monitoring with [Prometheus](http://prometheus.io) and [Grafana](https://grafana.com/)
  - Using [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine)
  - Using [GitHub Actions](https://github.com/features/actions) for CI/CD
    - new namespace created for every branch e.g development
    - when the branch is merged with production and deleted from GitHub, the environment is deleted from the cluster aswell
  - Creating Service Mesh with [Linkerd](https://linkerd.io/)
  - Using [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) for storing environmental variables
  - Implementing messaging between pods with [NATS](https://nats.io/)
  - Canary releasing with [Argo Rollouts](https://argoproj.github.io/argo-rollouts/)
  
## Pod descriptions

[DailyImage](/todo-app/todo-app-dailyimage) handles fetching new image from [picsum](https://picsum.photos) every midnight using cronjob and serves it for frontend at /dailyimage endpoint.

[MongoDB](todo-app/todo-app-mongodb) works as a statefulset for providing database. Upon launching runs a script shich creates database and secure user for GraphQL to use.

[GraphQL](todo-app/todo-app-graphql) for handling database queries.

[Broadcaster](todo-app/todo-app-broadcaster) receives payloads from GraphQL trough [NATS](https://nats.io/) and forwards them as a messages to a predefined [Telegram](https://telegram.org/) group. 

[Frontend](todo-app/todo-app-frontend) is implemented using React and styled with [Sass](https://sass-lang.com/). The page is served using nginx and at the same time it works as a reverse proxy for the dailyimage endpoint. The GraphQL requests are directed to /api endpoint.

## Comparing DBaaS and DIY-solution

Using database as a service can save a lot of time from configuring database server by yourself. The main pros of doing that are you dont have to worry about scaling, security updates, backuping data etc., you can just focus on building up your app. 

DBaaS solutions are highly scalable and for example from Google's Cloud SQL it is possible to get an test instance for about 10 dollars per month and scale it up as much as it suits your needs. Scaling with Cloud SQL is very easy, but with running your own database server it can be very time consuming to try to optimize the setup by yourself and of course for simple apps this is totally fine. There are also free solutions for testing purposes like MongoDB Atlas and Google Firebase. 

Cloud SQL backs up data for 7 days by default but it can dynamically be adjusted to suit applications needs. Persistent volume solution is typically backed up by a persistant disk but it is also possible to create volume snapshots to create a copy of your volume at a specific point of time. So in DIY-solution you are charge of ensuring that you data is properly backed up and retrievable.

In this project I used my own mongodb server just to see how much time it takes to set up an database server. The server itself starts up nicely, but there are some things to take in consideration which took up a many hours to figure out. For example using initial config script using docker-entrypoint for creating secure user with correct database permissions was time consuming since I wanted to use environmental variables passed from secrets, but it was not possible using javascript. Luckily I was able to use bash scripts to obtain the variables. Suddenly the next day the initial script stopped working and it took a couple hours to figure out that latest mongo image broke the initialization and downgrading to a previous version fixed the problem. Next time I just might use MongoDB Atlas instead of configuring everything by myself.

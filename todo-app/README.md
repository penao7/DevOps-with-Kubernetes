# Todo-App


# Comparing DBaaS and DIY-solution

Using database as a service can save a lot of time from configuring database server by yourself. The main pros of doing that are you dont have to worry about scaling, security updates, backuping data etc., you can just focus on building up your app. 

DBaaS solutions are highly scalable and for example from Google's Cloud SQL it is possible to get an test instance for about 10 dollars per month and scale it up as much as it suits your needs. Scaling with Cloud SQL is very easy, but with running your own database server it can be very time consuming to try to optimize the setup by yourself and of course for simple apps this is totally fine. There are also free solutions for testing purposes like MongoDB Atlas and Google Firebase. 

Cloud SQL backs up data for 7 days by default but it can dynamically be adjusted to suit applications needs. Persistent volume solution is typically backed up by a persistant disk but it is also possible to create volume snapshots to create a copy of your volume at a specific point of time. So in DIY-solution you are charge of ensuring that you data is properly backed up and retrievable.

In this project I used my own mongodb server just to see how much time it takes to set up an database server. The server itself starts up nicely, but there are some things to take in consideration which took up a many hours to figure out. For example using initial config script using docker-entrypoint for creating secure user with correct database permissions was time consuming since I wanted to use environmental variables passed from secrets, but it was not possible using javascript. Luckily I was able to use bash scripts to obtain the variables. Suddenly the next day the initial script stopped working and it took a couple hours to figure out that latest mongo image broke the initialization and downgrading to a previous version fixed the problem. Next time I just might use MongoDB Atlas instead of configuring everything by myself.

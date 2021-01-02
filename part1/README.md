
# Part 1

## [Random-string generator "main application"](/apps/random-string-app)

#### Exercise 1.01: Getting started

Create an application that generates a random string on startup, stores this string into memory, and outputs it every 5 seconds with a timestamp. e.g.

#### Exercise 1.03: Declarative approach

In your "main application" create the folder for manifests and move your deployment into a declarative file.

#### Exercise 1.07: External access with Ingress

Add an endpoint to request the current status (timestamp and hash) and an ingress so that you can access it with a browser.

#### Exercise 1.10: Even more services

Split the main application into two different containers within a single pod:
One generates a new timestamp every 5 seconds and saves it into a file. The other reads that file and outputs it with its hash for the user to see.

#### Exercise 1.11: Persisting data

Share data between ping-pong and main application using persistent volumes.

## [Todo-App](/apps/todo-app)

#### Exercise 1.02: Project v0.1

Create a web server that outputs "Server started in port NNNN" when it's started and deploy it into your Kubernetes cluster. You won't have access to the port yet but that'll come soon.

#### Exercise 1.04: Project v0.2

Create a deployment for your project.

#### Exercise 1.05: Project v0.3

Have the project respond something to a GET request sent to the project. A simple html page is good or you can deploy something more complex like a single-page-application.

#### Exercise 1.06: Project v0.4

Use a NodePort Service to enable access to the project.

#### Exercise 1.08: Project v0.5

Switch to using Ingress instead of NodePort to access the project.

#### Exercise 1.12: Project v0.6

Add a daily image where every day a new image is fetched on the first request.

#### Exercise 1.13: Project v0.7

- Add an input field. The input should not take todos that are over 140 characters long.
- Add a send button. It does not have to send the todo yet.
- Add a list for the existing todos with some hardcoded todos.

## [PingPong-app](/apps/pingpong-app)

#### Exercise 1.09: More services

Develop a second application that simply responds with "pong 0" to a GET request and increases a counter (the 0) so that you can see how many requests have been sent.


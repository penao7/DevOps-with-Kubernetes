# Frontend for TodoApp

This is the client for the Todo-App created by using React together with Apollo Client and styled with Sass. Form validation and handling was implemented by using [Formik](https://formik.org/docs/overview)

## Features:

- Daily changing image from `/dailyimage` endpoint, provided by [dailyimage-app](/todo-app/todo-app-dailyimage)
- Todo CRUD
- Todo history for marked done todos
- When applied a CRUD function (e.g todo added), a message will be sent to a predefined Telegram group

### Usage

Can be deployed using [kustomize](https://kustomize.io/) at the root

```
$ kubectl apply -k .
```

### Variables for docker build

```
REACT_APP_API_URL = <GraphQL API URL>
REACT_APP_IMAGE_URL = <URL for the dailyimage endpoint>
```


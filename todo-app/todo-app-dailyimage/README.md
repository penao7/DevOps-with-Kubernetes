# Dailyimage

When launched checks if there is already a image present and if not fetches new image from [picsum](https://picsum.photos/) and saves it to a persistent volume. After fetching the image will be available at /dailyimage endpoint. Makes use of [cronjob](https://www.npmjs.com/package/cron) when fetches new image at 00:00 every day.

## Usage

This service is intented to use with [kustomize](/https://kustomize.io/)

```
$ kubectl -k .
```

which will deploy the [kustomization.yaml](/todo-app/todo-app-dailyimage/kustomization.yaml).

By default the application runs at port 8000.

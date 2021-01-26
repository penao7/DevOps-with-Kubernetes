# Dailyimage

When lauched checks if there is already a image present and if not fetches new image from [picsum](https://picsum.photos/) and saves it to a persistent volume. After fetching the image will be available at /dailyimage endpoint. Makes use of [cronjob](https://www.npmjs.com/package/cron) when fetches new image at 00:00 every day.


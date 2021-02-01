# Hash-app

Brings in together all the information from [date-app](/main_app/date) and [pingpong-app](/main_app/pingpong-app).

## Functions

Current pongs are fetched from the [postgres](/main_app/postgres) database using `http://pingpong` endpoint which is provided by the [pingpong-app](/main_app/pingpong-app). 

Current date is read from `date.txt` file, which is updated every 5 seconds by the [date](/main_app/date) using Node.js [filesystem](https://nodejs.org/api/fs.html).

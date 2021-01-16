#!/bin/bash

# fetch random wikipedia article url from location header and put in into a file
curl https://en.wikipedia.org/wiki/Special:Random -sD - | grep location | awk '{print $2}' | xargs echo > url

# get the url from file and trim it suitable form
URL=$(cat -v -e url | tr -d '^M$');

# set query string and api url for GraphQL query
QUERY_STRING='{ "query": "mutation { createTodo(content: \"Read: '${URL}'\") { content } }" }'
API_URL="192.168.1.198:8081/api"

# add randomwikitodo
curl -X POST -H "Content-Type: application/json" -d "${QUERY_STRING}" ${API_URL}

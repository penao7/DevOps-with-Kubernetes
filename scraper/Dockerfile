FROM node:alpine

WORKDIR /scraper
#RUN apk update && \
#    apk add nginx
COPY . .
RUN npm install
RUN npm config set strict-ssl false
CMD ["node", "server.js"]

FROM node:14.15.4-alpine3.10 as build-stage

WORKDIR /frontend
COPY . .
ENV REACT_APP_API_URL=192.168.1.198:8081/api
ENV REACT_APP_IMAGE_URL=192.168.1.198:8081/dailyimage
RUN npm install && \
    npm rebuild node-sass && \
    npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /frontend/build .
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
EXPOSE 80

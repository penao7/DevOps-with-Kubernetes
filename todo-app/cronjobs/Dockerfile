FROM alpine 

WORKDIR /script
RUN apk --no-cache add curl
COPY createrandomwikitodo.sh .
CMD ["sh", "createrandomwikitodo.sh"]

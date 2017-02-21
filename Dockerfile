FROM node:7.5
MAINTAINER Sergey Zelenov

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git

RUN mkdir -p /opt/app
WORKDIR /opt/app

# PM2 settings folder (should be writable)
RUN mkdir /opt/.pm2 && chmod -R 777 /opt/.pm2
ENV PM2_HOME=/opt/.pm2

COPY package.json /opt/app/package.json
COPY npm-shrinkwrap.json /opt/app/npm-shrinkwrap.json

RUN npm install

COPY . /opt/app/

EXPOSE 8080

CMD ["./node_modules/.bin/pm2-docker", "start", "process.yml"]

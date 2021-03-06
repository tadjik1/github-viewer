# github-viewer [![Build Status](https://travis-ci.org/tadjik1/github-viewer.svg?branch=master)](https://travis-ci.org/tadjik1/github-viewer)
Simple github viewer that allows you to search users by programming languages.

See demo (deployed on Heroku): https://github-users-viewer.herokuapp.com/api/v1/users/javascript

## API
```
  GET /api/v1/users/:language # fetch users who are using this language

  GET /api/v1/users/:language?page=10 # fetch 10th page of users who are using this language

  # Response:

  {
    users: [UserSchema],
    pagination: PaginationSchema
  }

  UserSchema: object that represents user.
  fields:
    login: String - login on github
    name: String - real name
    avatar_url: String - link to user's avatar
    followers: Number - number of followers

  PaginationSchema: object that represents pagination state
  fields:
    total: Number - total pages in this query
    page: Number - current page
```

## Description
This is small API service that provides ability to search users on github based on languages that they are using.
### Technologies
Project is written in Javascript (Node.js) and uses Koa.js as a main framework. Application of Node.js >= 7.0.0 allows to use `async/await` which is a pretty nice and usefull feature from ES2017.
+For testing use mocha and assert libraries are used, also there is a mock library called nock.

### Authorization
Currently for local development unauthorized github flow is used which allows to make only 60 requests per hour. If you want to get more requests locally, please specify CLIENT_ID and CLIENT_SECRET env variables. Check [this](https://developer.github.com/v3/#rate-limiting) for additional info.

### Docker
You can run this application inside docker container. Please note that you still can set env variables using --env option.
```
$ docker build -t github-viewer .
$ docker run -ti --env CLIENT_ID=client_id -p 8080:8080 github-viewer
```

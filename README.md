# Movie Trailes App
````
Follow steps below to run application locally
Live example at itsankush.com
````
## Project setup
```
Pre-requisites

You will need a TMDB api key from
https://developers.themoviedb.org/3/getting-started/introduction

Set up a local mysql server

npm i from root folder
```

## Env file in root folder
```
Uncomment the .env.example file to simply .env then fill in the required keys
Example
TTL=3600
MAX_KEYS=50
JWT_SECRET=mysecret
JWT_EXPIRES_IN=86400
VUE_APP_BASE_URI='http://localhost:3000' if your is server ruunning on that port
```

### Next Step is to Compile the front build and run migrations to create tables
```
npm run build
npm run migrate
```

### Starts server on localhost:3000
```
npm run start and go on localhost:3000 on a browser
example endpoint:
localhost:3000/api/movies/search/{{query}}

```

### TODO To run some tests on the api
```
From root folder
Do npm test to test with jest
```

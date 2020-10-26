# Node API


My NodeJS API starter template, so I don't have to waste time setting things up from scratch each time.

## What you get
- Dependency Injection
- Delightful project structure
- ESLint
- PM2 configuration
- MongoDB configuration
- Docker configuration
- CI/CD workflows with Github Actions (It's currently set up to be hosted, but you can change it to any server you want by editing the cicd.yml file)
- Test setup with Mocha and Chai (with code coverage reports also)
- Babel configurations

## Getting started
Follow the instructions given below to get this project up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
- [Docker](https://docker.com)

### Installation
1. Clone this repository by running `git clone https://github.com/georgeben/nodejs-starter.git`

2. Change your directory to the project's directory by running `cd nodejs-starter`
3. Create a .env file and fill in all the values specified in the `env.schema` file
4. Start the application by running `docker-compose up`. Make sure you have stable internet connection, as some docker images may need to be downloaded.
5. Access the app by opening up http://localhost:3001/ on your browser.


## Running tests
To run tests, 
- Make sure your docker containers are running. If they aren't start them with the command `docker-compose up`
- Run `docker exec -it api_container_name npm run test`

## NPM Scripts
- test: Run both unit and integration tests
- build: Compile the source-code (/src) to generate code that can be deployed (/dist)
- dev: Run the app in development mode. The app is restarted on any file change, which makes development a bit faster.
- test:unit: Run unit tests
- test:integration: Run integration tests
- lint: Lint code using ESLint
- db:seed: Seed database
- prestart: Runs before the app starts. Runs the build and db:seed scripts
- start: Starts the app in production mode
- docs: Generates code documentation


## API Documentation
View the API Documentation here

## Technologies
- Javascript
- Node.js
- Express.js 
- MongoDB
- Docker
- Docker Compose

## Contributing
To contribute to this project, please read the Contributors Guidelines

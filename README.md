# Miles-api

The API that powers both the miles.ng applications and the public API for making and tracking deliveries.

## Project Specification
The functional requirements of this project can be found [here](https://docs.google.com/document/d/10rfQdTUjFkphNpPZfRmZqbTOrMWkcz8ooLiMHM8IuNU/edit?usp=sharing)  

## Getting started
Follow the instructions given below to get this project up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
- [Docker](https://docker.com)

### Installation
1. Clone this repository by running `git clone https://github.com/Miles-ng/miles-api`

2. Change your directory to the project's directory by running `cd miles-api`
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
View the API Documentation [here](http://docs.com)

## Technologies
- Javascript 💻: Programming language
- Node.js :zap: - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- Express.js - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. :fire:
- MongoDB 🌿: - MongoDB is a cross-platform document-oriented database.
- Docker 🐳 - Docker is a tool designed to make it easier to create, deploy, and run applications by using containers.
- Docker Compose 🐙 - A tool for defining and running multi-container Docker applications

## Contributing
To contribute to this project, please read the [Contributors Guidelines](https://github.com/Miles-ng/miles-api/blob/master/CONTRIBUTING.md)

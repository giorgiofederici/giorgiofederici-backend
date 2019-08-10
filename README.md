# Giorgio Federici Wep Application (Backend)

An API server created to support the web application frontend.
Always a work in progress!

# Architecture

The API server is a NodeJS, supported by Express and Mongoose middlewares. It follows a Model/Controller (thin controllers, fat models) pattern, as no views are involved in the backend (email templates excluded).

The source code is written in Typescript and then compiled in JavaScript for the production build.

The API server needs a MongoDB to work.

The API server is deployed on a Debian 9 VM in the [Hetzner Cloud](https://www.hetzner.com/cloud).

# CI/CD (Continuous integration/Continuous deployment)

The CI/CD works with [Travis CI](https://travis-ci.org/).

As a custom VPS is not supported by Travis CI providers, a custom deploy has been created with the 'script' provider and SSH connections.

For details, check the .travis.yml and deploy.sh files.

# SSL

HTTPS enabled thanks to [Let's Encrypt](https://letsencrypt.org/) certificate.

# Scripts

- build: it cleans the previous ./dist folder and compile the source code. Also TSLint process is executed
- build:clean: it deletes the previous ./dist folder
- build:ts: it compiles the TypeScript source code using the provided tsconfig.json file
- build:tslint: it launches the TSLint process using the provided tslint.json file
- debug: it launches the full build and then open the advanced debugger
- prestart: it lanches the full build (used in production)
- start: it starts the server (used in production)
- start:dev: it starts the server in development mode using nodemon config file
- start:prod: it starts the server in a fake production environment (used in development)
- test: it launches the Mocha tests (work in progress)
- test:coverage: it launches the code coverage using Jest (work in progress)

# Technologies

- NodeJs
- Express (Middleware)
- Mongoose (DB Middleware)
- TypeScript
- JWT
- Node Mailer
- Pug (Email Views)
- Mocha (work in progress)
- Jest (Work in progress)
- Mail Trap
- Send Grid

# Author

[Giorgio Federici](https://giorgiofederici.com)

# License

This project is licensed under the MIT License - see the LICENSE file for details

## ZagNow
We are a discovery platform operating in the digital commerce space in India. We help consumers discover, connect and shop with millions of local products and services. #vocalforlocal #madeinIndia

## Project Highling Features

⭐ Database Migrations - Database entities can easily migrate to new changes.
⭐ Isolation - Each entity (vendor, customer, admin, restaurant, reviews) has a separate API and database table.
⭐ Secure - With the help of role guard and auth guard, all the APIs are secured.
⭐ Code Organization - All entities have their own separate module, which makes it easy to maintain.

There is much room for improvement and scaling in this code, but due to current time restrictions, this is the best I have done.

## Run the below command to run the project if you have a ubuntu os
```bash
$ docker build -t my_postgres_pgadmin_image . && docker run -d -p 5435:5432 -p 5052:5050 --name my_postgres_pgadmin_container my_postgres_pgadmin_image && npm install && npm run build && node dist/main.js 
```
You can also install pgAdmin tool to view database ui


## Nestjs project breakdown
![image](https://github.com/amogh-chavan/zagnow/assets/55050758/c98b8391-c4f2-44dd-afb0-f238b89cdd4b)




## Database ERD 
![Untitled](https://github.com/amogh-chavan/zagnow/assets/55050758/d2c47f30-c006-4bad-8a17-bb7f8d298c24)

## Swagger Link
http://localhost:5000/docs
![image](https://github.com/amogh-chavan/zagnow/assets/55050758/12b491d6-a1e7-4720-b71f-9dfb71124880)
![image](https://github.com/amogh-chavan/zagnow/assets/55050758/22e747e2-d8e8-4527-8857-917a8f729976)

## Techstack
Typescript
Nestjs
Postgres - TypeORM


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Generating module
```bash
# creating new api module
$ nest generate module module_name module
```

## Database Migration commands

```bash
# creating new migration file
$ npm run migration:create --name=migration_name

# running new migration files
$ npm run migration:run
```
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

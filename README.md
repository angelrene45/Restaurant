# Restaurant App

## Backend Requirements

* [Docker](https://www.docker.com/).
* [Docker Compose](https://docs.docker.com/compose/install/).

## Frontend Requirements

* Node.js (with `npm`).

## Backend local development

* Start the stack with Docker Compose:

```bash
docker-compose up -d
```
* Start the stack Frontend:

```bash
docker-compose up -d db pgadmin backend
```

## When there are new changes in database

* Update database with alembic migrations:

```bash
docker-compose run backend alembic upgrade head
```

## Available services
You can open your browser and interact with these URLs:

Frontend:
* http://localhost:3000

Backend, JSON based web API based on OpenAPI: 
* http://localhost:8000/
* http://localhost:8000/docs
* http://localhost:8000/redoc

PGAdmin, PostgreSQL web administration
* http://localhost:5050


## Docker Logs
To check the logs, run:
```bash
docker-compose logs
```

To check the logs of a specific service, add the name of the service, e.g.:

```bash
docker-compose logs backend
```
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

* Now you can open your browser and interact with these URLs:

Frontend, built with Docker, with routes handled based on the path: http://localhost

Backend, JSON based web API based on OpenAPI: http://localhost/api/

Automatic interactive documentation with Swagger UI (from the OpenAPI backend): http://localhost/docs

Alternative automatic documentation with ReDoc (from the OpenAPI backend): http://localhost/redoc

PGAdmin, PostgreSQL web administration: http://localhost:5050

Flower, administration of Celery tasks: http://localhost:5555

Traefik UI, to see how the routes are being handled by the proxy: http://localhost:8090


To check the logs, run:

```bash
docker-compose logs
```

To check the logs of a specific service, add the name of the service, e.g.:

```bash
docker-compose logs backend
```
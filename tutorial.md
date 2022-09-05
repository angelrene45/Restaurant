# Tutorial

# all librarys from backend and put into requeriments.txt
pip install fastapi fastapi-sqlalchemy pydantic alembic psycopg2 uvicorn python-dotenv

# execute docker-compose.yml file and download the images 
docker-compose build
# raise the containers
docker-compose up

# do migrations 
docker-compose run backend alembic revision --autogenerate -m "New Migration"
docker-compose run backend alembic upgrade head


# docker cotainer running 
docker ps -a
# docker images
docker images
# Enter inside container
winpty docker exec -it <docker-image-id> bash
# stop all containers
docker stop $(docker ps -a -q)
# remove cotainers
docker rm $(docker ps -a -q)

# search how to update or replace the current docker image with docker-compose build command

# alpine shell 
/bin/ash
/bin/bash
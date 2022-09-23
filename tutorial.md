# Tutorial

# do migrations 
docker-compose run backend alembic revision --autogenerate -m "New Migration"
docker-compose run backend alembic upgrade head
docker-compose run backend alembic downgrade -1

# run unittest
docker-compose exec backend pytest
# run single unittest
docker-compose exec backend pytest -s -k "<name_test>"

## DOCKER TIPS
# execute docker-compose.yml and build images
docker-compose build
# up the containers
docker-compose up
# see docker containers running 
docker ps -a
# see docker images
docker images
# Enter inside container
winpty docker exec -it <docker-image-id> bash
# stop all containers
docker stop $(docker ps -a -q)
# Stop the container(s) in docker-compose:
docker-compose down
# remove cotainers
docker rm $(docker ps -a -q)
# Delete all volumes using the following command:
docker volume rm $(docker volume ls -q)
# Restart the containers using the following command:
docker-compose up -d

# alpine shell 
/bin/ash
/bin/bash
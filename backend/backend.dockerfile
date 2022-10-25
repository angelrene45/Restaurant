# pull official base image 
FROM python:3.10-slim-buster

# set working directory
WORKDIR /backend

# set environment variable
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV WATCHFILES_FORCE_POLLING=True
ENV PYTHONPATH=/backend

# install postgres-client-14 (pg_dump, pg_restore, psql)
RUN apt-get update \
  && apt-get -y install gnupg2 wget lsb-release\
  && sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' \
  && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && apt-get update \
  && apt-get -y install postgresql-client-14

# install system dependencies for python libraries
RUN apt-get update \
  && apt-get -y install libpq-dev netcat gcc \
  && apt-get clean

# install python dependencies
COPY requirements.txt requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# add app
COPY . /backend
EXPOSE 8000
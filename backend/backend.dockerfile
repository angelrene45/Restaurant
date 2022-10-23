# pull official base image 
FROM python:3.10-slim-buster

# set wroking directory
WORKDIR /backend

# set environment variable
<<<<<<< HEAD
ENV PYTHONUNBUFFERED=1
=======
ENV PYTHONDONTWRITEBYTECODE=1
>>>>>>> refs/remotes/origin/FrontBeto
ENV PYTHONUNBUFFERED=1
ENV WATCHFILES_FORCE_POLLING=True
ENV PYTHONPATH=/backend

# install system dependencies
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
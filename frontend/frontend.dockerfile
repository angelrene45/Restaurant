# pull official base image
FROM node:16-alpine
# set working directory
WORKDIR /frontend
# add all frontend files
COPY ./react-app /frontend
# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH
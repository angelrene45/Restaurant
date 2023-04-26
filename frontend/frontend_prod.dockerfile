# pull official base image
FROM node:16-alpine as build-stage
# set working directory
WORKDIR /frontend
# add all frontend files
COPY ./react-app /frontend/
# install app depedencies
RUN npm install
# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH
# create build
RUN vite build --mode=production 


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

# remove default nginx static assets 
RUN rm -rf ./usr/share/nginx/html/*

# copy static assets from builder stage
COPY --from=build-stage /frontend/dist/ /usr/share/nginx/html


ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM node:20 as build-stage

WORKDIR /app

COPY ../../frontend/package*.json ./
RUN npm install

COPY ../../frontend/ .
RUN npm run build

FROM nginx:alpine

# Copy custom Nginx configuration
COPY ../../frontend/nginx.conf /etc/nginx/nginx.conf

# Remove the default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Angular build output to the Nginx HTML directory
COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

#docker exec -it frontend-service sh

#docker stop frontend-service
#docker rm frontend-service
#docker rmi rupesh1997/frontend-service:1.0.0
#docker build -t rupesh1997/task-manager-frontend-service:1.0.0 -f docker/frontend/Dockerfile .
#docker run -p 8080:80 --name task-manager-frontend-service rupesh1997/task-manager-frontend-service:1.0.0


#Use a lightweight Nginx image as the base image
FROM nginx:alpine

#Set the working directory inside the container
WORKDIR /usr/share/nginx/html

#Copy project files into the container
COPY ../ .

#Expose port 80 (default for HTTP)
EXPOSE 80
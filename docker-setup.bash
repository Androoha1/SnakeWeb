docker build -t snake-web -f docker/Dockerfile .
docker run -d -p 8080:80 --name snake-container snake-web
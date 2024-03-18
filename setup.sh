cd C:/
git clone https://gitlab.com/games6082010/SnakeWeb

cd SnakeWeb

docker build -t snake-web -f docker/Dockerfile .
docker run -d -p 8080:80 --name snake-container snake-web
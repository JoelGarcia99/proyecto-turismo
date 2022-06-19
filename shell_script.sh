# exit on error
set -e

ROOT_PROJECT=${1%/}
echo "Working from $ROOT_PROJECT"

echo "Destroying previous images"
docker rmi -f portoturismo_backend
docker rmi -f portoturismo_frontend
docker rmi -f portoturismo_mongodb
docker rmi -f portoturismo_mysql

docker-compose stop
docker-compose rm -f

echo "Building backend image"
cd ./backend

docker build -t portoturismo_backend:latest .

cd ../web_frontend
echo "Building frontend image"
docker build -t portoturismo_frontend:latest .

docker-compose up -d

#TODO: php artisan migrate
#TODO: MySQL image
#TODO: MySQL connection on Laravel
#TODO: php artisan passport:install
#TODO: php artisan passport:install --uuids
#TODO: php artisan passport:keys

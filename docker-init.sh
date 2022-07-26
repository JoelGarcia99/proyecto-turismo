# exit on error
set -e

echo "Loading current dir into a variable"
CURRENT_DIR=$(pwd)

echo "Current dir is: $CURRENT_DIR"

echo "Initializing backend"
cd $CURRENT_DIR/Backend
docker build -t portoturismo_backend .

# The process above was tested and is working
echo "Initializing the frontend"
cd $CURRENT_DIR/Frontend

echo "Building the image"
docker build -t portoturismo_frontend .

# The process above was tested and is working
echo "Killing previous services"
docker-compose down

echo "assembling everything"
docker-compose up -d
#---------------------------------------------




echo "Installing passport"
docker exec portoturismo_backend php artisan passport:install

echo "Migrating database"
docker exec portoturismo_backend php artisan migrate


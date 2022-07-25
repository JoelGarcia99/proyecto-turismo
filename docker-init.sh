# exit on error
set -e

echo "Loading current dir into a variable"
CURRENT_DIR=$(pwd)

echo "Current dir is: $CURRENT_DIR"

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

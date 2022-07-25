# exit on error
set -e

CURRENT_DIR = $(pwd)

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

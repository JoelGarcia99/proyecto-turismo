# exit on error
set -e

# storing the current directory
CURRENT_DIR=$(pwd)

# updating apt 
echo "Updating APT"
apt-get update -y

# installing mongodb
echo "installing mongodb"
apt-get install -y mongodb

echo "Installing PHP"
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt install composer
echo "PHP has been installed."

echo "Installing mongodb driver for php"
apt-get install -y php-mongodb

echo "Installing MySQL"
apt-get install -y mysql-server

echo "Starting mongodb"
sudo service mongodb start

echo "Starting MySQL"
sudo service mysql start

echo "Creating a database"
mysql -u root -e "create database proyecto_turismo"

echo "Moving to the Backend directory"
cd $CURRENT_DIR/Backend

# removing .env if exists
if [ -f .env ]; then
	rm .env
fi

echo "Copying .env.example to .env"
cp .env.example .env

#removing vendor if exists
if [ -d vendor ]; then
	rm -rf vendor
fi

echo "Installing dependencies"
composer install

echo "Making migrations"
php artisan migrate

echo "Installing passport"
php artisan passport:install

echo "Moving to the fontend"
cd $CURRENT_DIR/Frontend

# removing .env if exists
if [ -f .env ]; then
	rm .env
fi

# removing node_modules if exists
if [ -d node_modules ]; then
	rm -rf node_modules
fi

echo "Copy .env.example to .env"
cp .env.example .env

echo "Installing dependencies"
npm install

echo "Everything is ready!"

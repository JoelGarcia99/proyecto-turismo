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
echo "PHP has been installed."

echo "Installing  php-curl"
sudo apt install php-curl

echo "Installing composer"
sudo apt install php-cli unzip -y 
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php

echo "Creating hash key"
HASH=`curl -sS https://composer.github.io/installer.sig`

echo "Verifying script"
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

echo "Making composer global"
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

echo "Printing version"
composer --version

echo "Installing mongodb driver for php"
apt-get install -y php-mongodb

echo "Installing MySQL"
apt-get install -y mysql-server

echo "Starting mongodb"
sudo service mongodb start

echo "Starting MySQL"
sudo service mysql start

# verifying the database does not exists
echo "Verifying database does not exists"
if [ ! -d /var/lib/mysql/proyecto_turismo ]; then
	echo "Database does not exists"
	echo "Creating a database"
	mysql -u root -e "create database proyecto_turismo"
else
	echo "Database exists"
fi

echo "Moving to the Backend directory"
cd $CURRENT_DIR/Backend

echo "Installing Node.js"
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install nodejs -y
echo "Node.js has been installed."

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

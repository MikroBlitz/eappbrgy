FROM php:8.3-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev libpq-dev \
    libssl-dev pkg-config libcurl4-openssl-dev libevent-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip sockets

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN pecl install redis && docker-php-ext-enable redis

RUN pecl install swoole-5.1.1 && docker-php-ext-enable swoole

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Ensure ownership
RUN chown -R www-data:www-data /var/www

# Expose ports
EXPOSE 8000 6001

# Run Octane using Swoole and Websocket
COPY run_server.sh /run_server.sh
RUN chmod +x /run_server.sh

CMD ["/run_server.sh"]

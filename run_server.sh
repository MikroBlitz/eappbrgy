#!/bin/sh

# Start Laravel Reverb in the background
php artisan reverb:start --port=6001 &

# Start Laravel Octane with Swoole in the foreground
exec php artisan octane:start --server=swoole --host=0.0.0.0 --port=8000

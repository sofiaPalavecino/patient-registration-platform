#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! php artisan migrate:status &> /dev/null; do
    sleep 1
done

echo "Database is ready!"

# Run migrations
echo "Running migrations..."
php artisan migrate:fresh --seed

# Generate application key if needed
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Clear and cache config for development
echo "Setting up Laravel for development..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Create storage link
php artisan storage:link

echo "Starting development servers..."

# Start Laravel development server in background
php artisan serve --host=0.0.0.0 --port=8000 &

# Start Vite development server
npm run dev -- --host=0.0.0.0 --port=5173

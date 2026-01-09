#!/bin/bash

echo "Waiting for main app to be ready..."
sleep 10

echo "Starting queue worker..."
php artisan queue:work --verbose --tries=3 --timeout=90

#!/bin/bash
set -e

APP_DIR="/home/deploy/monoshare"

echo "Pulling latest changes..."
cd $APP_DIR
git pull

echo "Installing backend dependencies..."
cd $APP_DIR/backend
npm install
npx prisma generate
npm run build

echo "Building frontend..."
cd $APP_DIR/frontend
npm install
npm run build

echo "Copying frontend to server..."
mkdir -p $APP_DIR/backend/built/public
cp -r dist/* $APP_DIR/backend/built/public/

echo "Restarting app..."
cd $APP_DIR
pm2 restart monoshare

echo "Done. Checking status..."
pm2 status
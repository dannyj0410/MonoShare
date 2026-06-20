#!/bin/bash
set -e

APP_DIR="/home/deploy/MonoShare"

echo "Pulling latest changes..."
cd $APP_DIR
git pull

echo "Installing backend dependencies..."
cd $APP_DIR/backend
npm ci
npx prisma generate

rm -rf built_tmp
npm run build
mv built built_tmp

echo "Building frontend..."
cd $APP_DIR/frontend
npm ci
VITE_RELEASE=$(git rev-parse --short HEAD) npm run build

echo "Copying frontend to temporary server folder..."
mkdir -p $APP_DIR/backend/built_tmp/public
cp -r dist/* $APP_DIR/backend/built_tmp/public/

echo "Performing atomic zero-downtime swap..."
cd $APP_DIR/backend
if [ -d "built" ]; then
    mv built built_old
    mv built_tmp built
    rm -rf built_old
else
    mv built_tmp built
fi

echo "Restarting app..."
cd $APP_DIR
pm2 restart MonoShare

echo "Done. Checking status..."
pm2 status
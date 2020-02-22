#!/usr/bin/env sh

echo "Waiting for postgres"

while ! nc -z db 5432; do
  sleep 0.1
done

echo "Postgres has started"

npm run start

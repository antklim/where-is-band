#!/bin/bash

COMMAND=$1
ENVIRONMENT=$2

if [ -z "$COMMAND" ]; then
  echo "Please, provide command"
  echo $"Usage: $0 {build|down|up} {env}"
  exit 1
fi

if [ -z "$ENVIRONMENT" ]; then
  echo "Please, provide environment"
  echo $"Usage: $0 {build|down|up} {env}"
  exit 1
fi

case "$COMMAND" in
  build)
    echo "Docker compose build for $ENVIRONMENT"
    docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml build
    ;;
  down)
    echo "Docker compose down for $ENVIRONMENT"
    docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml down
    ;;
  up)
    echo "Docker compose up for $ENVIRONMENT"
    docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml up -d --force-recreate
    ;;
  *)
    echo "Invalid command: $COMMAND"
    echo $"Usage: $0 {build|down|up} {env}"
    exit 1

esac

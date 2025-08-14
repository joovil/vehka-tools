#!/bin/bash

docker compose down ;
rm -rf db_data ;
docker compose up -d db
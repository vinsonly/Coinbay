#!/bin/bash

echo "Reseting Database."

sequelize db:drop

sequelize db:create

sequelize db:migrate

echo "Seeding initial data"

sequelize db:seed:all
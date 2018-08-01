#!/bin/bash

echo "Reseting Database."

sequelize db:drop

sequelize db:create

sequelize db:migrate

echo "Seeding initial data"

sequelize db:seed:all

# sequelize db:seed --seed 20180722234612-demo-user

# sleep 3;

# sequelize db:seed --seed 20180723004216-demo-postings

# sequelize db:seed --seed 20180723010724-demo-admins



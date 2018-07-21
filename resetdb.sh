#!/bin/bash

echo "Reseting Database."

sequelize db:drop

sequelize db:create

sequelize db:migrate
#!/bin/bash

echo "Creating database user."
sudo -u postgres psql -c "CREATE USER cbadmin WITH PASSWORD 'cbadmin';"

echo "Granting super user permissions"
sudo -u postgres psql -c "ALTER USER cbadmin WITH SUPERUSER;"

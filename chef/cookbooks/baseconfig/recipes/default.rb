# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end

execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

#remove cmdtest pkg
execute 'remove_cmdtest' do
  command 'sudo apt remove cmdtest -y'
end

# install and setup postgres
execute 'install_postgres1' do
  command 'sudo apt install postgresql -y'
end

#install nginx
execute 'install_nginx' do
  command 'sudo apt install nginx -y'
end

execute 'install_postgres2' do
  command 'sudo apt install postgresql-contrib -y'
end

execute 'install_yarn_package' do
  command 'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -'
end

execute 'echo_yarn' do
  command 'echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list'
end

execute 'update_packages' do
  command 'sudo apt-get update'
end

execute 'install_yarn' do
  command 'sudo apt-get install yarn -y'
end

execute 'install_node_package' do
  command 'curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -'
end

execute 'install_node' do
  command 'sudo apt-get install -y nodejs'
end

# install sequelize cli
execute 'install_sequelize_cli' do
  command 'sudo npm install -g sequelize-cli -y'
end

execute 'set_bash_file_permissions1' do
  command 'cd /home/vagrant/project && chmod u=rwx,g=rx,o=rx createuser.sh'
end

execute 'set_bash_file_permissions1' do
  command 'cd /home/vagrant/project && chmod u=rwx,g=rx,o=rx resetdb.sh'
end

execute 'install_node_gyp' do
  command 'sudo npm install node-gyp -g -y'
end

execute 'install_node_gyp' do
  command 'sudo apt-get install python -y'
end

execute 'install_node_gyp' do
  command 'sudo apt-get install make -y'
end

execute 'install_node_gyp' do
  command 'sudo apt-get install g++ -y'
end

execute 'bcrypt' do
  command 'cd /home/vagrant/project && sudo yarn add bcrypt'
end

execute 'install_server_dependencies' do
  command 'cd /home/vagrant/project && sudo yarn install'
end

# create psql user
execute 'create_db_user' do
  command 'cd /home/vagrant/project && ./createuser.sh'
end

cookbook_file "nginx-default" do
  path "/etc/nginx/sites-available/default"
end

# create databases
execute 'create_database_dev' do
  command 'sudo -u postgres createdb cryptobay-dev'
end

execute 'create_database_prod' do
  command 'sudo -u postgres createdb cryptobay-prod'
end

execute 'create_database_test' do
  command 'sudo -u postgres createdb cryptobay-test'
end

execute 'stop_nginx' do
  command 'sudo service nginx stop'
end

execute 'install_client_dependencies' do
  command 'cd /home/vagrant/project/client && sudo yarn install'
end

execute 'reset_db' do
  command 'cd /home/vagrant/project && ./resetdb.sh'
end

# execute 'start_server' do
#   command 'sudo yarn start &'
# end

# execute 'start_server' do
#   command 'cd /home/vagrant/project && sudo node server.js &'
# end

# execute 'start_client' do
#   command 'cd /home/vagrant/project/client && sudo yarn start'
# end 

execute 'start_app1' do
  command 'cd /home/vagrant/project/client && sudo yarn build'
end

execute 'start_app' do
  command 'cd /home/vagrant/project && sudo yarn nginxstart'
end

# execute 'start_nginx' do
#   command 'sudo service nginx restart'
# end


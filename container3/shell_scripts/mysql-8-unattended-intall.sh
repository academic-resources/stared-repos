sudo apt-get update && apt-get upgrade -y; 
sudo apt-get install -y debconf-utils zsh htop libaio1; 
wget --user-agent="Mozilla" -O mysql-apt-config_0.8.10-1_all.deb https://dev.mysql.com/get/mysql-apt-config_0.8.10-1_all.deb; 
export DEBIAN_FRONTEND="noninteractive"; 
echo mysql-apt-config mysql-apt-config/select-server select mysql-8.0 | sudo debconf-set-selections; 
sudo debconf-set-selections <<< 'mysql-community-server mysql-community-server/re-root-pass password rot' 
sudo debconf-set-selections <<< 'mysql-community-server mysql-community-server/root-pass password rot' 
sudo -E dpkg -i mysql-apt-config_0.8.10-1_all.deb; 

sudo apt-key adv --keyserver pgp.mit.edu --recv-keys 5072E1F5

sudo apt-get update; 

sudo -E apt-get install -y mysql-community-server; 
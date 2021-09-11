####This is a small bash function that can be useful if you want to find all your containers ip addresses.

***Instructions:*** 

1) Add this function to your ```~/.bashrc```, ```~/.bash_profile``` or ```~/.profile```;

2) run ```source ~/.bashrc```, ```source ~/.bash_profile``` or ```source ~/.profile``` to apply your changes;

3) run ```ipdock``` command to list ip addresses of all your containers.

***Example:***
```
# ipdock
IP ADDRESS       CONTAINER ID      IMAGE      COMMAND      CREATED            STATUS            PORTS     NAMES
172.17.0.4       75b9313bc364     ubuntu    "/bin/bash"   About a minute ago  Up About a minute       jovial_raman
172.17.0.3       3615843dc3ac     opensuse  "/bin/bash"   About a minute ago  Up About a minute       fervent_curie

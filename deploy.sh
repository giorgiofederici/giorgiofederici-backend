#!/bin/bash
echo "Ciao!"
ssh root@116.203.146.153 <<EOF
cd production
/usr/local/nvm/v11.14.0/lib/node_modules/pm2/bin/pm2 restart all
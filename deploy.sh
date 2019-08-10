#!/bin/bash
set -e
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@$BACKEND_HOST:/root/production
rsync --quiet package.json root@$BACKEND_HOST:/root/production
ssh root@$BACKEND_HOST <<EOF
 cd /root/production
 npm install
 /usr/local/nvm/v11.14.0/lib/node_modules/pm2/bin/pm2 reload all
 exit
EOF
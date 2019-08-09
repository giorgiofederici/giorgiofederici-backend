#!/bin/bash
set -e
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@116.203.146.153:/root/production
ssh root@116.203.146.153 <<EOF
 cd production/cd production/dist/server/bin
 /usr/local/nvm/v11.14.0/lib/node_modules/pm2/bin/pm2 start ./server.js
 exit
EOF
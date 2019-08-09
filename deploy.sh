-#!/bin/bash
set -e
echo "Ciao!"
echo $TRAVIS_BUILD_DIR
ssh root@116.203.146.153 <<EOF
 cd production/
 /usr/local/nvm/v11.14.0/lib/node_modules/pm2/bin/pm2 restart all
 exit
EOF
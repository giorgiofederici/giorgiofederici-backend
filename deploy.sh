-#!/bin/bash
set -e
echo "Ciao!"
echo $TRAVIS_BUILD_DIR
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@116.203.146.153:/root/production
ssh root@116.203.146.153 <<EOF
 cd production/
 /usr/local/nvm/v11.14.0/lib/node_modules/pm2/bin/pm2 restart all
 exit
EOF
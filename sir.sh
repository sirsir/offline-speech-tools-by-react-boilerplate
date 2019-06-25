#!/usr/bin/env sh
set -x #echo on

npm="/c/portapps/node-v10.13.0-win-x64/npm --scripts-prepend-node-path true"

#ln -s /c/portapps/node-v10.13.0-win-x64/node.exe /usr/bin/node


$npm -v
#$npm install
# $npm run dev



#$npm install --save isomorphic-unfetch

# $npm uninstall --save react-mic
#$npm install --save react-audio-recorder
#$npm install --save react-audio-recorder
#$npm install --save react-mic

# $npm run setup
# $npm install
# $npm install --save react-audio-recorder
#$npm run start

# ==== For RUN
$npm install --save diff-text
# $npm run start
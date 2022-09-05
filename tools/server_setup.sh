#! /bin/sh
# Script to setup a basic server with express, nodemon and mongoose

# FILE=./app.js
# JS_SETUP=$(cat << EOF
# const express = require('express');
# const app = express();

# app.get('/', (request, response) => { response.send("Hello world!"); });
# app.listen(3000);
# EOF
# 	)

GITIGNORE_CONTENT=$(cat << EOF
\# ignore emacs files
*\~
\#*
.\#*
*\#

# ignore json files
*.json

# igone node files
node_modules/
EOF
)

# create file app.js with a basic setup if it doesn't already exist
# if test -f "$FILE"; then
#   echo "$FILE exists."
# else
#   touch app.js
#   echo "${JS_SETUP}" >> $FILE
# fi

# add to gitignore
echo "${GITIGNORE_CONTENT}" >> .gitignore

# init server, install dependencies and setup nodemon
echo "Setting up server..."
npm init -y
npm install express mongoose
npm install -D nodemon
sed -i 's/\"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"/\"dev\": \"nodemon .\/app.js\"/g' package.json
npm run dev
echo"Server is running!"

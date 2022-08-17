#! /bin/sh
# Script to setup a basic server with express and nodemon

FILE=./app.js
JS_SETUP="const express = require('express');\nconst app = express();\napp.get('/', (request, response) => {\nresponse.send("Hello world!");\n});\napp.listen(3000);"

# create file app.js with a basic setup if it doesn't already exist
if test -f "$FILE"; then
    echo "$FILE exists."
else
  touch app.js
  echo $JS_SETUP >> $FILE
fi

# init server, install dependencies and setup nodemon
echo "Setting up server..."
npm init -y
npm install express
npm install -D nodemon
sed -ie 's/\"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"/\"dev\": \"nodemon ./app.js\"/g' ./package.json
npm run dev

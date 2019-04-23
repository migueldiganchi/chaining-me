'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// API
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  let data = {
    message: 'Welcome!'
  };
  res.send(JSON.stringify(data, null, 2));
});

app.get('/api/publications', (req, res) => {
  res.set('Content-Type', 'application/json');
  let data = {
    publications: [{
      id: 1,
      title: "Story nº 1",
      body: "Publication longer content and description",
      date_time: "May 8, 1982"
    }, {
      id: 2,
      title: "Story nº 2",
      body: "Publication longer content and description",
      date_time: "May 30, 1982"
    }, {
      id: 3,
      title: "Story nº 3",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 4,
      title: "Story nº 4",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }]
  };
  res.send(JSON.stringify(data, null, 2));
});

app.get('/api/authors', (req, res) => {
  res.set('Content-Type', 'application/json');
  let data = {
    authors: [{
      id: 1,
      name: "Miguel Diganchi",
      email: "name@gmail.com",
      birth_date: "May 8, 1982"
    }, {
      id: 2,
      name: "Diego Diganchi",
      email: "name@gmail.com",
      birth_date: "August 30, 2018"
    }, {
      id: 3,
      name: "Romina Herrera",
      email: "name@gmail.com",
      birth_date: "May 21, 1992"
    },
    {
      id: 4,
      name: "Miguel Diganchi",
      email: "name@gmail.com",
      birth_date: "May 8, 1982"
    }, {
      id: 5,
      name: "Diego Diganchi",
      email: "name@gmail.com",
      birth_date: "August 30, 2018"
    }, {
      id: 6,
      name: "Romina Herrera",
      email: "name@gmail.com",
      birth_date: "May 21, 1992"
    }]
  };
  res.send(JSON.stringify(data, null, 2));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, './../../client/build');

// Controllers
const applicationController = require('./controllers/application');
const authorsController = require('./controllers/authors');
// App

const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));


// API
app.get('/api', applicationController.welcome);

// API: Authors
app.get('/api/authors', authorsController.getAuthors);
app.get('/api/author/:id', authorsController.getAuthor);
app.put('/api/author/:id', authorsController.updateAuthor);
app.post('/api/author', authorsController.createAuthor);
app.delete('/api/author/:id', authorsController.removeAuthor);

// API: Publications
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

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

// Running app
console.log(`Running on http://${HOST}:${PORT}`);
app.listen(PORT, HOST);


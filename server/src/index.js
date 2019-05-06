'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, './../../client/build');

// Controllers
const applicationController = require('./controllers/application');
const authorsController = require('./controllers/authors');
const publicationsController = require('./controllers/publications');
// App

const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// Setting body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API
app.get('/api', applicationController.welcome);

// API: Authors
app.get('/api/authors', authorsController.getAuthors);
app.get('/api/author/:id', authorsController.getAuthor);
app.put('/api/author/:id', authorsController.updateAuthor);
app.post('/api/author', authorsController.createAuthor);
app.delete('/api/author/:id', authorsController.removeAuthor);

// API: mix
app.get('/api/author/:a_id/publications', publicationsController.getAuthorPublications);

// API: Publications
app.get('/api/publications', publicationsController.getPublications);
app.get('/api/publication/:id', publicationsController.getPublication);
app.post('/api/publication', publicationsController.createPublication);
app.put('/api/publication/:id', publicationsController.updatePublication);


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

// Running app
console.log(`Running on http://${HOST}:${PORT}`);
app.listen(PORT, HOST);


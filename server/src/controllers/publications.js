const Publication = require('./../models/Publication');

exports.getPublications = (req, res) => {
  Publication.getPublications()
    .then(result => {
      let publications = result[0];
      res.json({
        status: true,
        publications: publications
      });
    })
    .catch(error => {
      console.log('PublicationController.getPublications error: ', error);
      res.json({
        message: 'Error has ocourred getting publications'
      });
    });
};

exports.getPublication = (req, res) => {
  let id = req.params.id;

  Publication.getPublication(id)
    .then(result => {
      let publication = result[0][0];
      res.json({
        status: true,
        publication: publication
      });
    })
    .catch(error => {
      console.log('publicationsController.getPublication error', error);
      res.json({
        message: 'Error getting a publication'
      });
    });
};

exports.getAuthorPublications = (req, res) => {
  let authorId = req.params.id;
  
  Publication.getAuthorPublications(authorId)
  .then(result => {
      let authorPublications = result[0];
      res.json({
        status: true,
        publications: authorPublications
      });
    })
    .catch(error => {
      console.log('publicationsController.getAuthorPublications error', error);
      res.json({
        message: 'Error getting author publications'
      });
    });
};

exports.createPublication = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const authorId = req.body.author_id;
  const dateTime = new Date(); // @todo: req.body.date_time;
  
  Publication.savePublication(title, body, dateTime, authorId)
    .then(() => {
      res.json({
        status: true,
        message: 'Publication created successfully!'
      });
    })
    .catch(error => {
      console.log('PublicationsController.savePublication error: ', error);
      res.json({
        message: 'There has been an error during saving publication'
      });
    });
};

exports.updatePublication = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;
  const authorId = req.body.author_id;
  const dateTime = new Date(); // @todo: req.body.date_time;

  Publication.savePublication(title, body, dateTime, authorId, id)
    .then(() => {
      res.json({
        status: true,
        message: 'Publication updated successfully!'
      });
    })
    .catch(error => {
      console.log('PublicationsController.savePublication error: ', error);
      res.json({
        message: 'There has been an error during saving publication'
      });
    });
};

exports.removePublication = (req, res) => {
  const id = req.params.id;
  
  Publication.removePublication(id)
    .then((result) => {
      console.log('PublicationsController.removePublication result', result);
      res.json({
        status: true,
        message: 'Publication was removed successfully!'
      });
    })
    .catch(error => {
      console.log('PublicationsController.removePublication error', error);
      res.json({
        message: 'There has been an error removing the publication'
      });
    });
};
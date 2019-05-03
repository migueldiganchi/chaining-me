const Author = require('./../models/Author');

exports.getAuthors = (req, res) => {
  Author.getAuthors()
    .then(result => {
      let authors = result[0];
      res.json({
        status: true,
        authors: authors
      });
    })
    .catch(error => {
      console.log("authorsController.getAuthors error", error);
      res.json({
        status: false,
        message: 'Error getting authors'
      });
    });
};

exports.getAuthor = (req, res) => {
  const id = req.params.id;

  Author.getAuthor(id)
    .then(result => {
      let author = result[0][0];
      res.json({
        status: true,
        author: author
      });
    })
    .catch(error => {
      console.log('authorsController.getAuthor error', error);
      res.json({
        status: false,
        message: 'Error getting an author'
      });
    });
};

exports.createAuthor = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const birthDate = new Date(); // @todo: req.body.birth_date;

  Author.saveAuthor(name, email, birthDate)
    .then(() => {
      res.json({
        status: true,
        message: 'Author created successfully!'
      });
    })
    .catch(error => {
      res.json({
        status: false,
        message: 'Error creating author'
      });
      console.log('authorsController.createAuthor error', error);
    });
};

exports.updateAuthor = (req, res) => {
  const id = req.params.id
  const name = req.body.name;
  const email = req.body.email;
  const birthDate = new Date(); // @todo: req.body.birth_date;

  Author.saveAuthor(name, email, birthDate, id)
    .then(() => {
      res.json({
        status: true,
        message: 'Author updated successfully!'
      });
    })
    .catch(error => {
      console.log('authorsController.updateAuthor error', error);
      res.json({
        status: false,
        message: 'Error updating author'
      });
    });

};

exports.removeAuthor = (req, res) => {
  const id = req.query.id
  
  Author.removeAuthor(id)
    .then(() => {
      res.json({
        status: true,
        message: 'Author removed successfully'
      });
    })
    .catch(error => {
      console.log('authorsController.removeAuthor error', error);
      res.json({
        status: false,
        message: 'Error removing author'
      });
    });
}
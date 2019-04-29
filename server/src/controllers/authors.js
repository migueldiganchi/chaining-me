const Author = require('./../models/Author');

exports.getAuthors = (req, res) => {
  Author.getAuthors()
    .then(result => {
      let authors = result[0];
      console.log("authorsController.getAuthors", authors);
      res.json({
        status: true,
        authors: authors
      });
    })
    .catch(error => {
      console.log("authorsController.getAuthors error", error);
    });
};

exports.getAuthor = (req, res) => {
  const id = req.params.id;

  Author.getAuthor(id)
    .then(result => {
      let author = result[0][0];
      console.log('author in authorsController.getAuthor', author);
      res.json({
        status: true,
        author: author
      });
    })
    .catch(error => {
      console.log('authorsController.getAuthor error', error);
    });
};

exports.createAuthor = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const birthDate = req.body.birth_date;
  const author = new Author(name, email, birthDate);

  console.log('request', req);

  author.save()
    .then(result => {
      console.log('authorsController.createAuthor result', result);
      res.json({
        status: true,
        message: 'Author created successfully!'
      });
    })
    .catch(error => {
      console.log('authorsController.createAuthor error', error);
    });
};

exports.updateAuthor = (req, res) => {
  const id = req.query.id
  const author = Author.getAuthor(id);

  author.name = req.body.name;
  author.email = req.body.email;
  author.birthDate = req.body.birth_date;

  author.save()
    .then(result => {
      console.log('authorsController.updateAuthor result', result);
      res.json({
        status: true,
        message: 'Author updated successfully!'
      });
    })
    .catch(error => {
      console.log('authorsController.updateAuthor error', error);
    });

};

exports.removeAuthor = (req, res) => {
  const id = req.query.id
  const author = Author.getAuthor(id);
  
  author.remove()
    .then(result => {
      console.log('authorsController.removeAuthor result', result);
      res.json({
        status: true,
        message: 'Author removed successfully'
      });
    })
    .catch(error => {
      console.log('authorsController.removeAuthor error', error);
    });
}
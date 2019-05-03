const db = require('./../tools/database');

module.exports = class Author {
  constructor(name, email, birthDate) {
    this.publications = [];
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }

  static getAuthors () {
    return db.execute('SELECT * FROM authors');
  }

  static getAuthor(id) {
    return db.execute('SELECT * FROM authors WHERE id = ?', [id]);
  }

  static saveAuthor (name, email, birthDate, id) {
    if (!id) {
      return db.execute('INSERT INTO authors (name, email, birth_date) VALUES (?, ?, ?)',[
        name,
        email,
        birthDate
      ]);
    } else {
      return db.execute('UPDATE authors SET name = ?, email = ?, birth_date = ? WHERE id = ?',[
        name,
        email,
        birthDate,
        id
      ]);
    }
  }

  static removeAuthor (id) {
    return db.execute('DELETE FROM authors WHERE id = ?', [id]);
  }
}
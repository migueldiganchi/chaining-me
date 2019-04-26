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

  save () {
    if (this.id) {
      return db.execute('INSERT INTO authors (name, email, birth_date) VALUES (?, ?, ?, ?)',[
        this.name,
        this.email,
        this.birthDate
      ]);
    } else {
      return db.execute('UPDATE authors SET name = ?, email = ?, birth_date = ? WHERE id = ?',[
        this.name,
        this.email,
        this.birthDate,
        this.id
      ]);
    }
  }

  remove () {
    return db.execute('DELETE FROM authors WHERE id = ?', [this.id]);
  }
}
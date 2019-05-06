const db = require('./../tools/database');

module.exports = class Publication {

  static getPublications() {
    // @todo: apply filters
    return db.execute('SELECT * FROM publications');
  }

  static getAuthorPublications (authorId) {
    return db.execute('SELECT * FROM publications WHERE author_id = ?', [authorId]);
  }

  static getPublication (id) {
    return db.execute('SELECT * FROM publications WHERE id = ?', [id]);
  }

  static savePublication (title, body, dateTime, authorId, id) {
    if (id) {
      return db.execute('UPDATE publications SET title = ?, body = ?, date_time = ?, author_id = ? WHERE id = ?', [
        title,
        body,
        dateTime,
        authorId,
        id
      ]);
    } else {
      return db.execute('INSERT INTO publications (title, body, date_time, author_id) values (?, ?, ?, ?)', [
        title,
        body,
        dateTime,
        authorId
      ]);
    }
  }

  static removePublication (id) {
    return db.execute('DELETE FROM publications WHERE id = ?', [id]);
  }
};
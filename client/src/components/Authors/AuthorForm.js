import React from 'react';

const AuthorForm = (props) => {
  return (
    <form className="form">
      <div className="form-body">
        <div className="field">
          <input type="text"
          placeholder="Name"
          defaultValue={props.author.name}  />
        </div>
        <div className="field">
          <input type="email"
          placeholder="Email"
          defaultValue={props.author.email}  />
        </div>
        <div className="field">
          <input type="text"
          placeholder="Birth of date"
          defaultValue={props.author.birth_date} />
        </div>
      </div>

      <div className="keypad">
        <button className="do"
          onClick={props.onCancel}>
          <i className="fas fa-ban" />
          Cancel
        </button>

        <button type="submit"
          className="do do-primary">
          <i className="fas fa-hdd" />
          Save
        </button>
      </div>
    </form>
  );
}

export default AuthorForm;
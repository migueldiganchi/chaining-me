import React, {Component} from 'react';

class AuthorForm extends Component {
  state = {
    currentAuthor: {
      name: "Pirulo",
      email: "pirulo@gmail.com",
      birth_date: "Some day"
    }
  }

  saveAuthor = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.currentAuthor);
  }

  render () {
    return (
      <form 
        onSubmit={this.saveAuthor}
        className="form">
        <div className="form-body">
          <div className="field">
            <input type="text"
              autoFocus
              placeholder="Name"
              defaultValue={this.props.author.name}  />
          </div>
          <div className="field">
            <input type="email"
              placeholder="Email"
              defaultValue={this.props.author.email}  />
          </div>
          <div className="field">
            <input type="text"
              placeholder="Birth of date"
              defaultValue={this.props.author.birth_date} />
          </div>
        </div>

        <div className="keypad">
          <button type="button"
            className="do"
            onClick={this.props.onCancel}>
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
}

export default AuthorForm;
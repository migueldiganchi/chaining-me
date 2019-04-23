import React, {Component} from 'react';

class AuthorForm extends Component {
  state = {
    name: '',
    email: '',
    birth_date: ''
  };

  componentDidMount() {
    this.setState({
      id: this.props.author.id,
      name: this.props.author.name,
      email: this.props.author.email,
      birth_date: this.props.author.birth_date
    });
  };

  saveAuthor = (e) => {
    e.preventDefault();
    this.props.onSave({
      name: this.state.name,
      email: this.state.email,
      birth_date: this.state.birth_date
    });
  };

  typingName = (e) => {
    this.setState({name: e.target.value});
  };

  typingEmail = (e) => {
    this.setState({email: e.target.value});
  };

  typingBirthdate = (e) => {
    this.setState({birth_date: e.target.value});
  };

  render () {
    return (
      <form 
        onSubmit={this.saveAuthor}
        className="form">
        <div className="form-body">
          <div className="field">
            <input type="text"
              autoFocus
              onChange={this.typingName}
              placeholder="Name"
              value={this.state.name}  />
          </div>
          <div className="field">
            <input type="email"
              onChange={this.typingEmail}
              placeholder="Email"
              value={this.state.email}  />
          </div>
          <div className="field">
            <input type="text"
              onChange={this.typingBirthdate}
              placeholder="Birth of date"
              value={this.state.birth_date} />
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
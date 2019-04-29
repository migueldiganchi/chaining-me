import React, {Component} from 'react';
import axios from 'axios';

class AuthorForm extends Component {
  state = {
    name: '',
    email: '',
    birth_date: '',
    waiting: null
  };

  componentDidMount() {
    this.setState({
      id: this.props.author.id,
      name: this.props.author.name,
      email: this.props.author.email,
      birth_date: this.props.author.birth_date
    });
  };

  onSubmitAuthor = (e) => {
    e.preventDefault();
    this.saveAuthor({
      id: this.props.author.id,
      name: this.state.name,
      email: this.state.email,
      birth_date: this.state.birth_date
    });
  };

  saveAuthor = (author) => {
    console.log("saving author?", author);
    let loadingMessage = author.id ? 'Saving author...' : 'Creating author...';
    let method = author.id ? axios.put : axios.post;
    this.waitSending();
    this.props.onWait(loadingMessage);
    method('api/author', author)
      .then(response => {
        console.log('response', response);
        this.props.onStopWait();
        this.props.onNotify('Author saved successfully!', 'success');
        this.props.onCancel();
      })
      .catch(error => {
        console.log('Client error', error);
      });
  };

  waitSending = () => {
    this.setState({waiting: 'Sending author'});
  }

  stopWaitSending = () => {
    this.setState({waiting: null});
  }

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
    let cancelButtonClassName = this.state.waiting ? 
      'do disabled' : 
      'do';
    let submitButtonClassName = this.state.waiting ? 
      'do do-primary disabled' :
      'do do-primary';

    let formTitle = this.props.showFormTitle ? 
      <h4>{this.props.author.id ? 'Editing' : 'New'} Author</h4> : null

    return (
      <div className="form-container">
        {formTitle}
        <form 
          onSubmit={this.onSubmitAuthor}
          className="form">
          <div className="form-body">
            <div className="field">
              <input type="text"
                disabled={this.props.waiting}
                autoFocus
                onChange={this.typingName}
                placeholder="Name"
                value={this.state.name}  />
            </div>
            <div className="field">
              <input type="email"
                disabled={this.props.waiting}
                onChange={this.typingEmail}
                placeholder="Email"
                value={this.state.email}  />
            </div>
            <div className="field">
              <input type="text"
                disabled={this.props.waiting}
                onChange={this.typingBirthdate}
                placeholder="Birth of date"
                value={this.state.birth_date} />
            </div>
          </div>

          <div className="keypad">
            <button type="button"
              className={cancelButtonClassName}
              onClick={this.props.onCancel}>
              <i className="fas fa-ban" />
              Cancel
            </button>
            <button type="submit"
              className={submitButtonClassName}>
              <i className="fas fa-hdd" />
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AuthorForm;
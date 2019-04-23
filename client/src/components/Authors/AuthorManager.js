import React, {Component} from 'react';
import axios from 'axios';

import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm'

class AuthorManager extends Component {
  state = {
    newAuthor: null,
    author: null,
    authors: []
  }

  componentDidMount () {
    axios.get('/api/authors')
      .then(response => {
        console.log('author response', response);
        this.setState({authors: response.data.authors});
      })
      .catch(error => {
        console.error('Authors endpoint error', error);
      });
  }

  saveAuthor = (author) => {
    console.log("saving author?", author);
    this.props.onNotify("Author saved successfuly");
    this.cancelAuthorForm();
  };

  goAuthor = (author) => {
    console.log('@todo: go open author id: ' + author.id);
  };

  editAuthor = (author) => {
    console.log("editing author?", author);
    this.setState({author: author});
  };

  createAuthor = () => {
    this.setState({
      newAuthor: {
        id: null,
        name: '',
        email: '',
        birth_date: ''
      }
    });
  };

  cancelAuthorForm = () => {
    this.setState({
      newAuthor: null,
      author: null
    });
  };

  onFirstPage = (e) => {
    e.preventDefault();
    console.log('@todo: next page');
  };
  
  onPreviousPage = (e) => {
    e.preventDefault();
    console.log('@todo: previous page');
  };

  onNextPage = (e) => {
    e.preventDefault();
    console.log('@todo: next page');
  };

  onLastPage = (e) => {
    e.preventDefault();
    console.log('@todo: last page');
  };

  render () {
    let commanderClassName = this.props.isAuthorManagerVisible ? 
      'App-commander opened' : 
      'App-commander';

    let commanderAuthor = null;
    let commanderAuthorTitle = null;
    if (this.state.newAuthor) {
      commanderAuthor = this.state.newAuthor;
      commanderAuthorTitle = 'New Author';
    } else if (this.state.author) {
      commanderAuthor = this.state.author;
      commanderAuthorTitle = 'Editing Author';
    }

    let commanderKeypad = null;
    if (this.props.isAuthorManagerVisible) {
      commanderKeypad = [
        <a href="#"
          key="1"
          className="do do-success do-circular"
          onClick={this.props.onToggleManager}>
          <i className="fas fa-hand-point-left" />
        </a>, 
        (!commanderAuthor ? <a href="#"
          key="2"
          className="do do-success"
          onClick={this.createAuthor}>
          <i className="fas fa-plus" />
          Author
        </a> : null)
      ];
    } else {
      commanderKeypad = <a href="#"
        className="do do-success"
        onClick={this.props.onToggleManager}>
        <i className="fas fa-feather" />
        Author Manager
      </a>
    }

    let commanderTop = commanderAuthor ? (
      <h5 className="centered">
        {commanderAuthorTitle}
      </h5>
    ) : (
      <h5>
        Authors 
        <small>{this.state.authors.length}</small>
      </h5>
    )

    let commanderBody = commanderAuthor ? 
      <AuthorForm 
        author={commanderAuthor}
        onSave={this.saveAuthor}
        onCancel={this.cancelAuthorForm} 
        /> :
      <AuthorList 
        authors={this.state.authors}
        onEdit={this.editAuthor}
        onAuthorOpen={this.goAuthor}
        onFirst={this.onFirstPage} 
        onPrevious={this.onPreviousPage} 
        onNext={this.onNextPage} 
        onLast={this.onLastPage} 
        />;

    return (
      <div className={commanderClassName}>
        <div className="keypad">
          {commanderKeypad}
        </div>
        <div className="dashboard">
          <div className="dashboard-top">
            {commanderTop}
          </div>
          <div className="dashboard-body">
            {commanderBody}
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorManager;
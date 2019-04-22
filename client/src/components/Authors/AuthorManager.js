import React, {Component} from 'react';

import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm'

class AuthorManager extends Component {
  state = {
    newAuthor: null,
    author: null,
    authors: [{
      id: 1,
      name: "Miguel Diganchi",
      email: "name@gmail.com",
      birth_date: "May 8, 1982"
    }, {
      id: 2,
      name: "Diego Diganchi",
      email: "name@gmail.com",
      birth_date: "August 30, 2018"
    }, {
      id: 3,
      name: "Romina Herrera",
      email: "name@gmail.com",
      birth_date: "May 21, 1992"
    },
    {
      id: 4,
      name: "Miguel Diganchi",
      email: "name@gmail.com",
      birth_date: "May 8, 1982"
    }, {
      id: 5,
      name: "Diego Diganchi",
      email: "name@gmail.com",
      birth_date: "August 30, 2018"
    }, {
      id: 6,
      name: "Romina Herrera",
      email: "name@gmail.com",
      birth_date: "May 21, 1992"
    }]
  }

  goAuthor = (author) => {
    this.setState({
      author: author
    });
    setTimeout(() => {
      console.log("on author opened clicked", author);
    }, 3000);
  };

  saveAuthor = (author) => {
    console.log("saving author?", author);
    this.props.onNotify("Author saved successfuly");
    this.cancelForm();
  };

  openNewAuthorForm = () => {
    console.log("on new button clicked");
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

  cancelForm = () => {
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
        <i className="fas fa-hand-point-right" />
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
        onCancel={this.cancelForm} /> :
      <AuthorList 
        authors={this.state.authors}
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
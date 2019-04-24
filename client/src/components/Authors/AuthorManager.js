import React, {Component} from 'react';
import axios from 'axios';

import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm'
import AuthorRemover from './AuthorRemover'

class AuthorManager extends Component {
  state = {
    newAuthor: null,
    editingAuthor: null,
    removingAuthor: null,
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
    this.setState({editingAuthor: author});
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
      editingAuthor: null
    });
  };

  startRemoving = (author) => {
    console.log("start removing with author: ", author);
    this.setState({removingAuthor: author});
  };

  removeAuthor = (author) => {
    console.log('Do effective the removing', author);
    setTimeout(() => {
      this.props.onNotify('Publication removed successfuly');
      this.cancelRemoving();
    }, 3000);
  };

  cancelRemoving = () => {
    console.log('cancel removing');
    this.setState({removingAuthor: null});
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

  getCommanderKeypad = (commanderAuthor) => {
    let keypad = null;
    if (this.props.isAuthorManagerVisible) {
      keypad = [
        <a key="1"
          className="do do-primary do-circular"
          onClick={this.props.onToggleManager}>
          <i className="fas fa-hand-point-left" />
        </a>, 
        (!commanderAuthor ? <a key="2"
          className="do do-success"
          onClick={this.createAuthor}>
          <i className="fas fa-plus" />
          Author
        </a> : null)
      ];
    } else {
      keypad = <a className="do do-primary"
        onClick={this.props.onToggleManager}>
        <i className="fas fa-feather" />
        Author Manager
      </a>
    }

    return keypad;
  };

  getCommanderTop = (commanderAuthor, commanderAuthorTitle) => {
    return commanderAuthor || this.state.removingAuthor ? (
      <h5 className="centered">
        {commanderAuthorTitle}
      </h5>
    ) : (
      <h5>
        Authors 
        <small>{this.state.authors.length}</small>
      </h5>
    )
  };

  render () {
    let commanderAuthor = null;
    let commanderAuthorTitle = null;
    let commanderClassName = this.props.isAuthorManagerVisible ? 
      'App-commander opened ' : 
      'App-commander';

    if (this.state.newAuthor) {
      commanderAuthor = this.state.newAuthor;
      commanderAuthorTitle = 'New Author';
    } else if (this.state.editingAuthor) {
      commanderAuthor = this.state.editingAuthor;
      commanderAuthorTitle = 'Editing Author';
    } else if (this.state.removingAuthor) {
      commanderAuthorTitle = 'Are you sure?'
    }

    let commanderKeypad = this.getCommanderKeypad(commanderAuthor);
    let commanderTop = this.getCommanderTop(commanderAuthor, commanderAuthorTitle);
    let commanderDashbardClassName = null;
    let commanderBody = null;
    
    if (this.state.removingAuthor) {
      commanderDashbardClassName = 'dashboard confirmation';
      commanderBody = <AuthorRemover
      author={this.state.removingAuthor}
      onCancelRemoving={this.cancelRemoving}
      onConfirmRemoving={this.removeAuthor}
      />
    } else if (commanderAuthor) {
      commanderDashbardClassName = 'dashboard saving';
      commanderBody = <AuthorForm 
      author={commanderAuthor}
      onSave={this.saveAuthor}
      onCancel={this.cancelAuthorForm} 
      />
    } else {
      commanderDashbardClassName = 'dashboard';
      commanderBody = <AuthorList 
        authors={this.state.authors}
        onEdit={this.editAuthor}
        onStartRemoving={this.startRemoving}
        onAuthorOpen={this.goAuthor}
        onFirst={this.onFirstPage} 
        onPrevious={this.onPreviousPage} 
        onNext={this.onNextPage} 
        onLast={this.onLastPage} 
        />;
    }

    return (
      <div className={commanderClassName}>
        <div className="keypad">
          {commanderKeypad}
        </div>
        <div className={commanderDashbardClassName}>
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
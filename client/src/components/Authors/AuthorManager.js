import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm'
import AuthorRemover from './AuthorRemover'

class AuthorManager extends React.Component {
  state = {
    newAuthor: null,
    editingAuthor: null,
    removingAuthor: null,
    authors: []
  }

  componentDidMount () {
    axios.get('/api/authors')
      .then(response => {
        this.setState({authors: response.data.authors});
      })
      .catch(error => {
        console.error('Authors endpoint error', error);
      });
  }

  goAuthor = (author) => {
    this.props.history.push({
      pathname: '/author/' + author.id
    });
    // close manager
    this.props.onGoAuthor();
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
    this.props.onWait('Removing author...');
    setTimeout(() => {
      this.props.onStopWait();
      this.props.onNotify('Author removed successfully', 'success');
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
        (!commanderAuthor && !this.state.removingAuthor ? <a key="2"
          className="do do-success"
          onClick={this.createAuthor}>
          <i className="fas fa-plus" />
          Author
        </a> : null)
      ];
    } else {
      keypad = <a className="do do-primary "
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
        {this.props.waiting ? this.props.waiting : commanderAuthorTitle}
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
      commanderAuthorTitle = 'Removing: Are you sure?'
    }

    let commanderKeypad = this.getCommanderKeypad(commanderAuthor);
    let commanderTop = this.getCommanderTop(
      commanderAuthor, 
      commanderAuthorTitle
    );
    let commanderDashbardClassName = null;
    let commanderBody = null;
    
    if (this.state.removingAuthor) {
      commanderDashbardClassName = 'dashboard confirmation';
      commanderBody = (
        <AuthorRemover
          author={this.state.removingAuthor}
          onCancelRemoving={this.cancelRemoving}
          onConfirmRemoving={this.removeAuthor}
          waiting={this.props.waiting}
          />
      );
    } else if (commanderAuthor) {
      commanderDashbardClassName = 'dashboard saving';
      commanderBody = (
        <AuthorForm 
          author={commanderAuthor}
          onCancel={this.cancelAuthorForm} 
          waiting={this.props.waiting}
          />
      );
    } else {
      commanderDashbardClassName = 'dashboard';
      commanderBody = (
        <AuthorList 
          authors={this.state.authors}
          onEdit={this.editAuthor}
          onStartRemoving={this.startRemoving}
          onAuthorOpen={this.goAuthor}
          onFirst={this.onFirstPage} 
          onPrevious={this.onPreviousPage} 
          onNext={this.onNextPage} 
          onLast={this.onLastPage}
          />
      );
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

export default withRouter(AuthorManager);
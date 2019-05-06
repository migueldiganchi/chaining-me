import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PublicationManager from './../Publications/PublicationManager';
import AuthorForm from './../Authors/AuthorForm';
import Toolbar from './../../components/Toolbar';

import botWink from './../../assets/media/bot-wink.gif';

class Author extends React.Component {
  state = {
    author: null,
    creationEnabled: false,
    editingAuthor: null,
    removingAuthor: null,
    waiting: null
  };

  componentWillReceiveProps (newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      let id = newProps.match.params.id;
      this.getAuthor(id);
    } 
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.getAuthor(id);
  }

  getAuthor = (id) => {
    axios.get('/api/author/' + id)
    .then(response => {
        let author = response.data.author;
        this.setState({author: author});
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  cancelAuthorForm = () => {
    this.setState({
      editingAuthor: null
    });
  };

  editAuthor = () => {
    this.setState({editingAuthor: this.state.author});
  };

  startRemoving = () => {
    this.setState({removingAuthor: this.state.author});
  };

  cancelRemoving = () => {
    this.setState({removingAuthor: null});
  };

  confirmRemoving = () => {
    console.log('do effective author removing');
    setTimeout(() => {
      this.props.onNotify('Author removed successfully');
    }, 3000);
  };

  getAuthorInfo = () => {
    let infoBlockClassName = this.state.removingAuthor ? 
      'info-block removing' :
      'info-block';

    let authorBodyText = this.state.removingAuthor ? 
      <div className="confirmer">
        <h4>Removing: Are you sure?</h4>
      </div> : null

    let authorBody = (
      <div>
        <div className="author-info-picture">
          <img src={botWink} alt={this.state.author.name} />
        </div>
        <div className="author-info-text">
          <h2>{this.state.author.name}</h2>
          <p>
            <b>{this.state.author.email}</b>
          </p>
          <p>
            {this.state.author.birth_date}
          </p>
        </div>
      </div>
    );

    let authorBodyActions = this.state.removingAuthor ? 
      <div className="confirmer">
        <div className="keypad">
          <a className="do"
            disabled={this.state.waiting}
            onClick={this.cancelRemoving}>
            <i className="fas fa-ban" />
            Cancel
          </a>
          <a className="do do-warning"
            disabled={this.state.waiting}
            onClick={this.confirmRemoving}>
            <i className="fas fa-eraser" />
            Remove
          </a>
        </div>
      </div> : null;

    return (
      <div className={infoBlockClassName}>
        {/* Removing confirmer text */}
        { authorBodyText }
        {/* Author body */}
        { authorBody }
        {/* Remover confirmer actions */}
        { authorBodyActions }
      </div>
    );
  };

  createPublication = () => {
    this.setState({creationEnabled: true});
  };

  cancelNewPublication = () => {
    this.setState({creationEnabled: false});
  };

  onSaveAuthor = (author) => {
    this.getAuthor(author.id);
  };

  render () {
    let publicationManager = !this.state.removingAuthor && !this.state.editingAuthor ?
      <PublicationManager 
        waiting={this.state.waiting}
        onNotify={this.props.onNotify}
        onWait={this.props.onWait}
        onStopWait={this.props.onStopWait} 
        onCreatePublication={this.createPublication}
        onCancelPublicationForm={this.cancelNewPublication}
        author={this.state.author}
        /> : null;

    let authorInfoClassName = !this.state.creationEnabled ? 
      'author-info' : 'author-info creating';

    return (
      this.state.author ? 
      <div className="App-author">

      <Toolbar 
        isAuthorManagerVisible={this.props.isAuthorManagerVisible}
        showControls={!this.state.removingAuthor && !this.state.editingAuthor}
        onEdit={this.editAuthor}
        onStartRemoving={this.startRemoving}
        />

        <div className={authorInfoClassName}>
          {this.state.editingAuthor 
            ? 
            <AuthorForm 
              showFormTitle={true}
              author={this.state.editingAuthor}
              onNotify={this.props.onNotify}
              onCancel={this.cancelAuthorForm}
              onWait={this.props.onWait}
              onSave={this.onSaveAuthor}
              onStopWait={this.props.onStopWait}
              /> 
            : 
            this.getAuthorInfo()}
        </div>

        { publicationManager }

      </div> : null
    );
  }
}

export default withRouter(Author);
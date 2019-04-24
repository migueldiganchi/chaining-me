import React, {Component} from 'react';
import axios from 'axios';

import PublicationList from './PublicationList';
import Searcher from './../Searcher';

class PublicationManager extends Component {
  state = {
    newPublication: null,
    publication: null,
    removingPublication: null,
    publications: []
  };

  componentDidMount (term) {
    console.log('term to get publications');
    this.getPublications();
  };

  goFirstPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications next page');
  };

  goPreviousPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications previous page');
  };

  goNextPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications next page');
  };

  goLastPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications last page', e);
  };

  getPublications = () => {
    console.log('Publication manager did mount!');
    this.props.onWait(true);
    axios.get('/api/publications')
      .then(response => {
        this.props.onStopWait();
        console.log('response', response);
        this.setState({
          publications: response.data.publications
        });
        console.log('response', response);
      })
      .catch(error => {
        this.props.onStopWait();
        console.error('Application error: ', error);
      });
  };
  
  goPublication(publication) {
    console.log('go publication?', publication);
  }

  createPublication = (publication) => {
    console.log('creating publication', publication);
    this.setState({
      newPublication: {
        id: null,
        title: '',
        body: ''
      }
    });
  };

  editPublication = (publication) => {
    console.log('editing publication', publication);
    this.setState({
      editingPublication: publication
    });
  };

  startRemoving = (publication) => {
    console.log('removing publication', publication);
    this.setState({
      removingPublication: publication
    });
  };

  removePublication = (publication) => {
    console.log('@todo: remove this publication ', publication);
    this.props.onWait("Removing publication...");
    setTimeout(() => {
      this.props.onStopWait();
      this.props.onNotify('Publication removed successfuly');
      this.cancelRemoving();
    }, 3000);
  };

  cancelRemoving = () => {
    this.setState({
      removingPublication: null
    });
  };

  savePublication = (publication) => {
    let loadingMessage = publication.id ? 
      'Saving publication...' : 
      'Creating publication...';
    this.props.onWait(loadingMessage);
    setTimeout(() => {
      this.props.onStopWait();
      this.props.onNotify('Publication saved successfuly!', 'success');
      this.cancelPublicationForm();
    }, 3000);
  };

  cancelPublicationForm = () => {
    this.setState({
      newPublication: null,
      editingPublication: null
    });
  };

  orderPublications = (field, orientation) => {
    console.log('field?', field);
    console.log('orientation?', orientation);
  };

  render () {
    let searcher = null;
    let keypadTitle = null;
    
    if (!this.state.newPublication && !this.state.editingPublication) {
      searcher = <Searcher 
        onSearch={this.getPublications}
        onOrder={this.orderPublications}
        />;
      keypadTitle = (
        <div className="keypad board-panel-keypad">
          <div className="text">
            <span>Publications</span>
            <small>{this.state.publications.length} results</small>
          </div>
          <a href="#"
            className="do do-success"
            onClick={this.createPublication}>
            <i className="fas fa-plus" />
            Publication
          </a>
        </div>
      );
    }

    return (
      <div>
        {searcher}
        {keypadTitle}
        <PublicationList
          newPublication={this.state.newPublication}
          editingPublication={this.state.editingPublication}
          removingPublication={this.state.removingPublication}
          publications={this.state.publications}
          disableItems={this.state.newPublication}
          onFirst={this.goFirstPage}
          onPrevious={this.goPreviousPage}
          onNext={this.goNextPage}
          onLast={this.goLastPage}
          onSave={this.savePublication}
          onOpen={this.goPublication}
          onCancel={this.cancelPublicationForm}
          onEdit={this.editPublication}
          onStartRemoving={this.startRemoving}
          onConfirmRemoving={this.removePublication}
          onCancelRemoving={this.cancelRemoving}
          />
      </div>
    );
  }
}

export default PublicationManager;
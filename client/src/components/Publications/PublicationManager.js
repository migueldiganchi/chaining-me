import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PublicationList from './PublicationList';
import PublicationListTitle from './PublicationListTitle';
import Searcher from './../Searcher';

class PublicationManager extends React.Component {

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
    this.props.onWait(true);
    axios.get('/api/publications')
      .then(response => {
        this.props.onStopWait();
        this.setState({
          publications: response.data.publications
        });
      })
      .catch(error => {
        this.props.onStopWait();
        console.error('Application error: ', error);
      });
  };

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
      this.props.onNotify('Publication removed successfully');
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
      this.props.onNotify('Publication saved successfully!', 'success');
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
    let publicationListTitle = null;
    
    if (!this.state.newPublication && !this.state.editingPublication) {
      searcher = <Searcher 
        onSearch={this.getPublications}
        onOrder={this.orderPublications}
        />;
      publicationListTitle = (
        <PublicationListTitle 
          title="Publications"
          results={this.state.publications.length}
          publications={this.state.publications}
          onCreatePublication={this.createPublication} />
      );
    }

    return (
      <div>
        {searcher}
        {publicationListTitle}
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

export default withRouter(PublicationManager);
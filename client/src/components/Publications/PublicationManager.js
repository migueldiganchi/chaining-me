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

  componentDidMount () {
    console.log('Publication manager did mount!');
    axios.get('/api/publications')
      .then(response => {
        console.log('response', response);
        this.setState({
          publications: response.data.publications
        });
        console.log('response', response);
      })
      .catch(error => {
        console.error('Application error: ', error);
      });
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

  searchPublications = (term) => {
    console.log('doing search! :D', term);
    this.props.onNotify("@todo: Doing publication search");
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
    console.log('do effective the removing of this publication: ', publication);
    setTimeout(() => {
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
    console.log('publication', publication);
    this.props.onNotify('Publication saved successfuly');
    this.cancelPublicationForm();
  };

  cancelPublicationForm = () => {
    this.setState({
      newPublication: null,
      editingPublication: null,
      removingPublication: null
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
        onSearch={this.searchPublications}
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
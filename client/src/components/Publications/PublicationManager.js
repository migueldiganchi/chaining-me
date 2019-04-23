import React, {Component} from 'react';
import axios from 'axios';

import PublicationList from './PublicationList';
import Searcher from './../Searcher';

class PublicationManager extends Component {
  state = {
    newPublication: null,
    publication: null,
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
      publication: publication
    });
  }

  savePublication = (publication) => {
    console.log('publication', publication);
    this.props.onNotify('Publication saved successfuly');
    this.cancelPublicationForm();
  };

  cancelPublicationForm = () => {
    this.setState({
      publication: null,
      newPublication: null
    });
  };

  render () {
    let keypadTitle = null;
    let buttonStyle = {
      visibility: this.state.publication ? 'hidden' : 'visible'
    };
    
    if (!this.state.newPublication) {
      keypadTitle = (<div className="keypad board-panel-keypad">
        <div className="text">
          <span>Publications</span>
          <small>{this.state.publications.length} results</small>
        </div>
        <a href="#"
          style={buttonStyle} 
          className="do do-success"
          onClick={this.createPublication}>
          <i className="fas fa-plus" />
          Publication
        </a>
      </div>);
    }

    return (
      <div>
        <Searcher 
          onSearch={this.searchPublications} 
          />
        {keypadTitle}
        <PublicationList
          newPublication={this.state.newPublication}
          publication={this.state.publication}
          publications={this.state.publications}
          onFirst={this.goFirstPage}
          onPrevious={this.goPreviousPage}
          onNext={this.goNextPage}
          onLast={this.goLastPage}
          onSave={this.savePublication}
          onPublicationOpen={this.goPublication}
          onCancel={this.cancelPublicationForm}
          onEdit={this.editPublication}
          />
      </div>
    );
  }
}

export default PublicationManager;
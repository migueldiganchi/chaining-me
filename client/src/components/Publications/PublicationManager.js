import React, {Component} from 'react';

import PublicationList from './PublicationList';
import Searcher from './../Searcher';

class PublicationManager extends Component {
  state = {
    newPublication: null,
    publication: null,
    publications: [{
      id: 1,
      title: "Story nº 1",
      body: "Publication longer content and description",
      date_time: "May 8, 1982"
    }, {
      id: 2,
      title: "Story nº 2",
      body: "Publication longer content and description",
      date_time: "May 30, 1982"
    }, {
      id: 3,
      title: "Story nº 3",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 4,
      title: "Story nº 4",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 5,
      title: "Story nº 5",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 6,
      title: "Story nº 6",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 7,
      title: "Story nº 7",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 8,
      title: "Story nº 8",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 9,
      title: "Story nº 9",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }]
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
    console.log('creating publication', publication);
    this.setState({
      publication: publication
    });
  }

  savePublication = (publication) => {
    console.log('publication', publication);
    this.props.onNotify('Publication saved successfuly');
  };

  cancelPublicationForm = () => {
    this.setState({
      publication: null,
      newPublication: null
    });
  };

  render () {
    return (
      <div>
        <Searcher 
          onSearch={this.searchPublications} 
          />
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
        <PublicationList
          newPublication={this.state.newPublication}
          publication={this.state.publication}
          publications={this.state.publications}
          onFirst={this.goFirstPage}
          onPrevious={this.goPreviousPage}
          onNext={this.goNextPage}
          onLast={this.goLastPage}
          onSave={this.savePublication}
          onCancel={this.cancelPublicationForm}
          onEditPublication={this.editPublication}
          />
      </div>
    );
  }
}

export default PublicationManager;
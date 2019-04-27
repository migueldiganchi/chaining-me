import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PublicationList from './../Publications/PublicationList';
import PublicationListTitle from './../Publications/PublicationListTitle';
import Toolbar from './../../components/Toolbar';

import botWink from './../../assets/media/bot-wink.gif';

class Author extends React.Component {
  state = {
    author: null,
    publications: []
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
        this.getPublications();
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  getPublications = () => {
    console.log('Publication manager did mount in Author profile!');
    this.props.onWait(true);
    axios.get('/api/publications')
      .then(response => {
        this.props.onStopWait();
        this.setState({
          publications: response.data.publications
        });

        this.props.onNotify(this.state.author.name + ' profile');
      })
      .catch(error => {
        this.props.onStopWait();
        console.error('Application error: ', error);
      });
  };

  goBack = () => {
    console.log('going back?');
    this.props.history.goBack();
  }

  render () {
    return (
      this.state.author ? 
      <div className="App-author">
        <Toolbar isAuthorManagerVisible={this.props.isAuthorManagerVisible} />
        <div className="author-info">
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
        <PublicationListTitle 
          title="Publications"
          results={this.state.publications.length}
          onCreatePublication={this.onCreatePublication}
          />
        <PublicationList publications={this.state.publications} />
      </div> : null
    );
  }
}

export default withRouter(Author);
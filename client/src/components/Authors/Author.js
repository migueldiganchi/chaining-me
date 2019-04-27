import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PublicationList from './../Publications/PublicationList';

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
        this.setState({
          author: author
        });
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
        console.log('response', response);
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
          <h2>{this.state.author.name}</h2>
          <p>
            {this.state.author.email}
          </p>
          <div>
            <a onClick={this.goBack}
              className="do">Go back</a>
          </div>
          <PublicationList publications={this.state.publications} />
        </div> : null
    );
  }
}

export default withRouter(Author);
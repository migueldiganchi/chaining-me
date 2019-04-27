import React from 'react';
import { Link } from 'react-router-dom';

import Toolbar from './../../components/Toolbar';

class Publication extends React.Component {
  state = {
    publication: {
      id: 1,
      title: 'This would be the title',
      body: 'This would be the body of the publication written by the author specified below',
      date_time: '2012-12-12 12:12:12'
    },
    author: {
      id: 2,
      name: 'Diego Diganchi',
      birth_date: '2018-08-30'
    }
  };

  render () {
    let authorPath = '/author/' + this.state.author.id;
    return (
      <div className="App-publication">
        <div className="publication-content">
          <h2>{this.state.publication.title}</h2>
          <p>{this.state.publication.body}</p>
          <p>{this.state.publication.date_time}</p>
        </div>
        <div className="publication-author">
          by <Link to={authorPath}>
            {this.state.author.name}
          </Link>
        </div>
        <Toolbar isAuthorManagerVisible={this.props.isAuthorManagerVisible} />
      </div>
    )
  }
}

export default Publication;
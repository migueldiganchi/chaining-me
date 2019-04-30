import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Toolbar from './../../components/Toolbar';
import PublicationForm from './PublicationForm';

class Publication extends React.Component {
  state = {
    editingPublication: null,
    removingPublication: null,
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

  editPublication = () => {
    this.setState({editingPublication: this.state.publication});
  };

  startRemoving = () => {
    this.setState({removingPublication: this.state.publication});
  };

  cancelRemoving = () => {
    this.setState({removingPublication: null});
  };

  confirmRemoving = () => {
    console.log('@todo: do effective removing');
    setTimeout(() => {
      this.props.onNotify('Publication removed successfully', '', 3000, () => {
        this.props.history.push({ pathname: '/' });
      });
    }, 3000);
  };

  getPublicationInfo = () => {
    let infoBlockClassName = this.state.removingPublication ? 
      'info-block removing' :
      'info-block';

    let publicationBodyText = this.state.removingPublication ? 
      <div className="confirmer">
        <h4>Removing: Are you sure?</h4>
      </div> : null;

    let publicationBody = (
      <div>
        <h2>{this.state.publication.title}</h2>
        <p>{this.state.publication.body}</p>
        <p>{this.state.publication.date_time}</p>
      </div>
    );

    let publicationBodyActions = this.state.removingPublication ? 
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
            {this.state.waiting ? 'Removing...' : 'Remove'}
          </a>
        </div>
      </div> : null;

    return <div className={infoBlockClassName}>
      {/* Confirmer text */}
      { publicationBodyText }
      {/* Publication body information */}
      { publicationBody }
      {/* Publication body confirmer actions */}
      { publicationBodyActions }
    </div>;
  };

  cancelPublicationForm = () => {
    this.setState({editingPublication: null});
  };

  render () {
    let authorPath = '/author/' + this.state.author.id;
    return (
      <div className="App-publication">
        { this.state.editingPublication ? 
          <PublicationForm 
            publication={this.state.editingPublication}
            onCancel={this.cancelPublicationForm}
            onNotify={this.props.onNotify}
            /> :
          this.getPublicationInfo() 
        }
        <div className="publication-author">
          by <Link to={authorPath}>
            {this.state.author.name}
          </Link>
        </div>
        <Toolbar 
          isAuthorManagerVisible={this.props.isAuthorManagerVisible}
          showControls={!this.state.editingPublication && !this.state.removingPublication}
          onEdit={this.editPublication}
          onStartRemoving={this.startRemoving} />
      </div>
    )
  }
}

export default withRouter(Publication);
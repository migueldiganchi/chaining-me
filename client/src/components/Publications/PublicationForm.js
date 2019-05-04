import React, { Component } from 'react';
import axios from 'axios';

class PublicationForm extends Component {

  constructor(props) {
    super(props);
    if (!props.author) {
      this.loadAuthors();
    } else {
      alert('author loading needless');
    }
  }

  state = {
    title: '',
    body: '',
    date_time: '',
    authorId: null,
    authors: []
  };

  componentDidMount() {
    this.setState({
      id: this.props.publication.id,
      title: this.props.publication.title,
      body: this.props.publication.body,
      date_time: '2012-12-12 00:00:00',
      titleClassName: 'field',
      bodyClassName: 'field',
      dateTimeClassName: 'field',
      authorClassName: 'field',
    });
  };

  savePublication = (e) => {
    e.preventDefault();
    let publication = {
      id: this.props.publication.id,
      title: this.state.title,
      body: this.state.body
    };
    if (!this.validate(publication)) {
      return;
    }
    this.props.onSave(publication);
  };

  validate = (publication) => {
    let error = false;
    
    if (publication.title === '') {
      error = true;
      this.setState({ titleClassName: 'field error' });
    } else {
      this.setState({ titleClassName: 'field' });
    }

    if (publication.body === '') {
      error = true;
      this.setState({ bodyClassName: 'field error' })
    } else {
      this.setState({ bodyClassName: 'field' });
    }

    if (publication.date_time === '') {
      error = true;
      this.setState({ dateTimeClassName: 'field error' });
    } else {
      this.setState({ dateTimeClassName: 'field' });
    }
    
    if (!this.props.author && this.state.authorId < 1) {
      error = true;
      this.setState({ authorClassName: 'field error' });
    } else {
      this.setState({ authorClassName: 'field' });
    }
    
    if (error) {
      this.props.onNotify('Ups, check your information please', 'error');
    }

    return !error;
  };

  typingTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  typingBody = (e) => {
    this.setState({ body: e.target.value });
  };

  typingDateTime = (e) => {
    this.setState({ date_time: e.target.value });
  };

  changingAuthor = (e) => {
    console.log('changingAuthor: e', e.target.value);
    this.setState({authorId: e.target.value});
  };

  loadAuthors = () => {
    console.log('@todo: loading Authors?');
    axios.get('/api/authors')
      .then(response => {
        const authors = response.data.authors;
        console.log('response: ', response);
        this.setState({ authors: authors });
      })
      .catch(error => {
        this.props.onNotify('There was a problem loading errors', 'error')
      });
  };

  getAuthorSelectorControl = () => {
    if (!this.state.authors || this.state.authors.length < 1) {
      return null;
    } else {
      console.log('this.state.authors', this.state.authors);
      return (
        <div className={this.state.authorClassName}>
          <select onChange={this.changingAuthor}>
            <option value={0}>Select an author...</option>
            {this.state.authors.map((author) => {
              return (
                <option 
                  key={author.id} 
                  value={author.id}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
  };

  render() {
    let formTitle = <h4>{this.props.publication.id ? 'Editing' : 'New'} Publication</h4>
    let authorControl = this.props.author ?
      <input type="hidden" value={this.props.author.id} /> :
      this.getAuthorSelectorControl();

    return (
      <div className="form-container">
        {formTitle}
        <form action="/publications"
          method="post"
          className="form"
          onSubmit={this.savePublication}>
          <div className="form-body">
            <div className={this.state.titleClassName}>
              <input type="text"
                autoFocus
                onChange={this.typingTitle}
                placeholder="Title"
                value={this.state.title} />
            </div>
            <div className={this.state.bodyClassName}>
              <textarea type="text"
                rows="3"
                onChange={this.typingBody}
                placeholder="Publication body"
                value={this.state.body}></textarea>
            </div>
            <div className={this.state.dateTimeClassName}>
              <input type="text"
                onChange={this.typingDateTime}
                placeholder="Date and time of publication"
                value={this.state.date_time} />
            </div>
            {authorControl}
          </div>

          <div className="keypad">
            <button type="button"
              className="do"
              onClick={this.props.onCancel}>
              <i className="fas fa-ban" />
              Cancel
              </button>
            <button type="submit"
              className="do do-primary">
              <i className="fas fa-hdd" />
              Save
              </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PublicationForm;
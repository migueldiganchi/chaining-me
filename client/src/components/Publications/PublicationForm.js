import React, {Component} from 'react';

class PublicationForm extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    this.setState({
      id: this.props.publication.id,
      title: this.props.publication.title,
      body: this.props.publication.body,
      date_time: '2012-12-12 00:00:00',
      titleClassName: 'field',
      bodyClassName: 'field',
      dateTimeClassName: 'field'
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
    
    if (publication.title == '') {
      error = true;
      this.setState({titleClassName: 'field error'});
    } else {
    }
    
    if (publication.body == '') {
      error = true;
      this.setState({bodyClassName: 'field error'})
    }
    
    if (publication.date_time == '') {
      error = true;
      this.setState({dateTimeClassName: 'field error'});
    }
    
    if (!error) {
      this.setState({titleClassName: 'field'});
      this.setState({bodyClassName: 'field'});
      this.setState({dateTimeClassName: 'field'});
    } else {
      this.props.onNotify('Ups, check your information please', 'error');
    }

    return !error;
  };

  typingTitle = (e) => {
    this.setState({title: e.target.value});
  };

  typingBody = (e) => {
    this.setState({body: e.target.value});
  };  

  typingDateTime = (e) => {
    this.setState({date_time: e.target.value});
  };

  render() {
    let formTitle = <h4>{this.props.publication.id ? 'Editing' : 'New'} Publication</h4>

    return(
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
                value={this.state.title}  />
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
                autoFocus
                onChange={this.typingDateTime}
                placeholder="Title"
                value={this.state.date_time}  />
            </div>
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
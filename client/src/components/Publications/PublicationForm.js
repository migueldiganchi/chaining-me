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
      // @todo: datetime
    });
  };

  savePublication = (e) => {
    e.preventDefault();
    this.props.onSave({
      id: this.props.publication.id,
      title: this.state.title,
      body: this.state.body
    });
  };

  typingTitle = (e) => {
    this.setState({title: e.target.value});
  };

  typingBody = (e) => {
    this.setState({body: e.target.value});
  };  

  render() {
    let formTitle = <h4>{this.props.publication.id ? 'Editing' : 'New'} Publication</h4>

    return(
      <div>
        {formTitle}
        <form action="/publications" 
          method="post"
          className="form"
          onSubmit={this.savePublication}>
          <div className="form-body">
            <div className="field">
              <input type="text"
                autoFocus
                onChange={this.typingTitle}
                placeholder="Title"
                value={this.state.title}  />
            </div>
            <div className="field">
              <textarea type="text"
                rows="3"
                onChange={this.typingBody}
                placeholder="Publication body"
                value={this.state.body}></textarea>
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
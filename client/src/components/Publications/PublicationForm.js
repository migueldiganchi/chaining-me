import React, {Component} from 'react';

class PublicationForm extends Component {
  state = {
    currentPublication: {
      title: 'Content of the form publication',
      body: 'Body of form publication'
    }
  }

  savePublication = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.currentPublication);
  }

  render() {
    return(
      <form action="/publications" 
        method="post"
        className="form"
        onSubmit={this.savePublication}>
        <div className="form-body">
          <div className="field">
            <input type="text"
              autoFocus
              placeholder="Title"  />
          </div>
          <div className="field">
            <input type="text"
              placeholder="Body" />
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
    );
  }
}

export default PublicationForm;
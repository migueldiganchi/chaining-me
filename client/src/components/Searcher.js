import React, {Component} from 'react';

class Searcher extends Component {
  state = {
    isActive: false,
    term: ''
  }
  suggestSearching = () => {
    console.log('loading focus');
    this.setState({
      isActive: true
    });
  }

  finishSuggestion = () => {
    console.log('finishing focus');
    this.setState({
      isActive: false
    });
  }

  goSearch = (e, term) => {
    this.props.onSearch(e, term);
  }

  onTyping = (e) => {
    this.setState({
      term: e.target.value
    });
  }

  render () {
    let placeholderText = !this.state.isActive ? 
      'Search publications' :
      '';
    let searcherClassName = this.state.isActive ? 
      'App-searcher active' :
      'App-searcher';

    return (
      <div className={searcherClassName}>
        <form 
          action="/searcher" 
          method="get"
          onSubmit={(e) => this.goSearch(e, this.state.term)}>
          <input 
            onFocus={this.suggestSearching}
            onBlur={this.finishSuggestion}
            onChange={this.onTyping}
            type="text"
            value={this.state.term}
            placeholder={placeholderText} />
          <button className="do do-circular">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
    );
  }
}

export default Searcher;
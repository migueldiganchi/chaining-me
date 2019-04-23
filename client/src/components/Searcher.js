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

  goSearch = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.term);
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
          onSubmit={this.goSearch}>
          <input 
            onFocus={this.suggestSearching}
            onBlur={this.finishSuggestion}
            onChange={this.onTyping}
            type="text"
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
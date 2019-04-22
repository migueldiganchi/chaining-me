import React, {Component} from 'react';

import AuthorList from './AuthorList';

import bot from './../../assets/media/bot.jpg';

class AuthorManager extends Component {
  state = {
    isDashboardVisible: false,
    authors: [{
      id: 1,
      name: "Miguel Diganchi",
      birth_date: "May 8, 1982"
    }, {
      id: 2,
      name: "Diego Diganchi",
      birth_date: "August 30, 2018"
    }, {
      id: 3,
      name: "Romina Herrera",
      birth_date: "May 21, 1992"
    },
    {
      id: 4,
      name: "Miguel Diganchi",
      birth_date: "May 8, 1982"
    }, {
      id: 5,
      name: "Diego Diganchi",
      birth_date: "August 30, 2018"
    }, {
      id: 6,
      name: "Romina Herrera",
      birth_date: "May 21, 1992"
    }]
  }

  toggleManager = () => {
    this.setState({
      isDashboardVisible: !this.state.isDashboardVisible
    });
  }

  goAuthor = () => {
    console.log("on author opened clicked");
  };

  openNewAuthorForm = () => {
    console.log("on new button clicked");
  }

  onFirstPage = (e) => {
    e.preventDefault();
    console.log('@todo: next page');
  }
  
  onPreviousPage = (e) => {
    e.preventDefault();
    console.log('@todo: previous page');
  }

  onNextPage = (e) => {
    e.preventDefault();
    console.log('@todo: next page');
  }

  onLastPage = (e) => {
    e.preventDefault();
    console.log('@todo: last page');
  }

  render () {
    let commanderClassName = this.state.isDashboardVisible ? 
      'App-commander opened' : 
      'App-commander';

    let keypadContent = !this.state.isDashboardVisible ? (
        <a href="#"
          className="do do-success"
          onClick={this.toggleManager}>
          Authors
        </a>
      ) : [
        <a href="#"
          key="1"
          className="do do-success do-circular"
          onClick={this.toggleManager}>
          <i className="fas fa-times" />
        </a>, 
        <a href="#"
          key="2"
          className="do do-success"
          onClick={this.toggleManager}>
          <i className="fas fa-plus" />
          Author
        </a>
      ];

    return (
      <div className={commanderClassName}>  
        <div className="keypad">
          {keypadContent}
        </div>
        <div className="dashboard">
          <div className="dashboard-top">
            <h5>
              Authors 
              <small>{this.state.authors.length}</small>
            </h5>
          </div>
          <AuthorList 
            authors={this.state.authors}
            onAuthorOpen={this.goAuthor}
            onFirst={this.onFirstPage} 
            onPrevious={this.onPreviousPage} 
            onNext={this.onNextPage} 
            onLast={this.onLastPage} 
            />
        </div>
      </div>
    );
  }
}

export default AuthorManager;
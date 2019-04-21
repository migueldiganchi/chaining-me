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

  render () {
    let commanderMenuText = this.state.isDashboardVisible ? 
      'Close' : 
      "Authors";
    let commanderClassName = this.state.isDashboardVisible ? 
      'App-commander opened' : 
      'App-commander';

    return (
      <div className={commanderClassName}>  
        <div className="logo">   
          <img src={bot} />
        </div>
        <div className="keypad">
          <a href="#"
            className="do do-success"
            onClick={this.toggleManager}>{commanderMenuText}</a>
        </div>
        <div className="dashboard">
          <div className="dashboard-top">
            <h5>Authors <small>{this.state.authors.length}</small></h5>
            <a href="#"
              className="do do-success"
              onClick={this.openNewAuthorForm}>New</a>
          </div>
          <AuthorList 
            authors={this.state.authors}
            onAuthorOpen={this.goAuthor} />
        </div>
      </div>
    );
  }
}

export default AuthorManager;
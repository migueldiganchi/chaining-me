import React, { Component } from 'react';

import Header from './components/Header'
import Board from './components/Board'
import Notifier from './components/Notifier';
import BoardPanel from './components/BoardPanel'
import AuthorManager from './components/Authors/AuthorManager';
import PublicationManager from './components/Publications/PublicationManager';

import './compiled/App.css';

class App extends Component {
  constructor() {
    super();
  }

  state = {
    notification: null,
    isAuthorManagerVisible: false,
  };

  toggleManager = () => {
    this.setState({
      isAuthorManagerVisible: !this.state.isAuthorManagerVisible
    });
  }

  notify = (message, messageType, messageTimeout, afterNotify) => {
    this.setState({
      notification: {
        message: message,
        type: messageType ? messageType : 'info'
      }
    });

    setTimeout(() => {
      this.stopNotify();
    }, messageTimeout || 3000);
  }

  notifyError = (message) => {
    console.log(message);
    this.notify(message, 'error');
  };

  stopNotify = () => {
    this.setState({notification: null});
  };

  render() {
    let glassApp = this.state.isAuthorManagerVisible ? (
      <div className="App-glass"
        onClick={this.toggleManager}></div>
    ) : null;

    return (
      <div className="App">
        {glassApp}
        <Header
          title="Welcome to Chaining-me.Text"
          introduction="The new way of doing art, with posts" 
          />
        <AuthorManager 
          onToggleManager={this.toggleManager}
          isAuthorManagerVisible={this.state.isAuthorManagerVisible}
          onNotify={this.notify}
          />
        <Board>
          <BoardPanel>
            <PublicationManager 
              onNotify={this.notify} 
              />
          </BoardPanel>
        </Board>
        <Notifier notification={this.state.notification} />
      </div>
    );
  }
}

export default App;
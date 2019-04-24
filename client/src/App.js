import React, { Component } from 'react';

import Loading from './components/Loading';
import Header from './components/Header'
import Board from './components/Board'
import Notifier from './components/Notifier';
import BoardPanel from './components/BoardPanel'
import AuthorManager from './components/Authors/AuthorManager';
import PublicationManager from './components/Publications/PublicationManager';

import './compiled/App.css';

class App extends Component {
  state = {
    notification: null,
    waiting: false,
    isAuthorManagerVisible: false
  };

  toggleManager = () => {
    this.setState({
      isAuthorManagerVisible: !this.state.isAuthorManagerVisible
    });
  };

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

  wait = (message) => {
    console.log('start waiting...');
    this.setState({
      waiting: message,
      notification: {
        message: message
      }
    });
  }

  stopWait = () => {
    console.log('stop waiting');
    this.setState({
      waiting: false,
      notification: null
    });
  };

  render() {
    let glassApp = this.state.isAuthorManagerVisible || this.state.waiting ? (
      <div className="App-glass"
        onClick={this.toggleManager}></div>
    ) : null;

    let loadingApp = this.state.waiting ? <Loading /> : null;

    return (
      <div className="App">
        {glassApp}
        {loadingApp}
        <Header
          title="Welcome to Chaining-me.Text"
          introduction="The new way of doing art, with posts" 
          />
        <AuthorManager 
          onToggleManager={this.toggleManager}
          isAuthorManagerVisible={this.state.isAuthorManagerVisible}
          onNotify={this.notify}
          onWait={this.wait}
          onStopWait={this.stopWait}
          />
        <Board>
          <BoardPanel>
            <PublicationManager 
              onNotify={this.notify}
              onWait={this.wait}
              onStopWait={this.stopWait} 
              />
          </BoardPanel>
        </Board>
        <Notifier 
          notification={this.state.notification}
          waiting={this.state.waiting} />
      </div>
    );
  }
}

export default App;
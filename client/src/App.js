import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Loading from './components/Loading';
import Header from './components/Header'
import Board from './components/Board'
import Notifier from './components/Notifier';
import BoardPanel from './components/BoardPanel'
import AuthorManager from './components/Authors/AuthorManager';
import Author from './components/Authors/Author';
import PublicationManager from './components/Publications/PublicationManager';
import Publication from './components/Publications/Publication';

import './compiled/App.css';

class App extends Component {
  state = {
    notification: null,
    waiting: null,
    isAuthorManagerVisible: false
  };

  toggleManager = () => {
    if (this.state.waiting) {
      return;
    }
    this.setState({
      isAuthorManagerVisible: !this.state.isAuthorManagerVisible
    });
  };

  notify = (message, messageType, messageTimeout, callback) => {
    this.setState({
      notification: {
        message: message,
        type: messageType ? messageType : 'info'
      }
    });

    setTimeout(() => {
      this.stopNotify();
      if (callback) {
        callback();
      }
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
      waiting: null,
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
        {/* Hader component */}
        <Route path="/" exact render={() => {
          return <Header title="Welcome to Chaining-me.Text">
            <p>The new way of doing art, <b>with posts</b></p>
          </Header>
        }} />
        {/* Board component */}
        <Board>
          <BoardPanel>
            {/* Main page */}
            <Route path="/" exact render={() => {
              return [
                <PublicationManager 
                  key="1"
                  waiting={this.state.waiting}
                  onNotify={this.notify}
                  onWait={this.wait}
                  onStopWait={this.stopWait} 
                />, 
                <AuthorManager 
                  key="2"
                  onToggleManager={this.toggleManager}
                  isAuthorManagerVisible={this.state.isAuthorManagerVisible}
                  onGoAuthor={this.toggleManager}
                  waiting={this.state.waiting}
                  onNotify={this.notify}
                  onWait={this.wait}
                  onStopWait={this.stopWait}
                  />
                ];
              }} />
            {/* Author page */}
            <Route path="/author/:id" render={(props) => {
              return <Author 
                waiting={this.state.waiting}
                onNotify={this.notify}
                onWait={this.wait}
                onStopWait={this.stopWait}
                isAuthorManagerVisible={this.state.isAuthorManagerVisible}
                {...props} />
              }} />
            {/* Publication page */}
            <Route path="/publication/:id" render={(props) => {
              return <Publication
                waiting={this.state.waiting}
                onNotify={this.notify}
                onWait={this.wait}
                onStopWait={this.stopWait}
                isAuthorManagerVisible={this.state.isAuthorManagerVisible}
                {...props}/>
              }} />
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
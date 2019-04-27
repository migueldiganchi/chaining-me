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

  notify = (message, messageType, messageTimeout) => {
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

        <Header
          title="Welcome to Chaining-me.Text"
          introduction="The new way of doing art, with posts" 
          />

        <AuthorManager 
          onToggleManager={this.toggleManager}
          isAuthorManagerVisible={this.state.isAuthorManagerVisible}
          waiting={this.state.waiting}
          onNotify={this.notify}
          onWait={this.wait}
          onStopWait={this.stopWait}
          />

        <Board>
          <BoardPanel>
            <Route path="/" exact render={(props) => {
              // console.log('Route props', props);
              return <PublicationManager 
                waiting={this.state.waiting}
                onNotify={this.notify}
                onWait={this.wait}
                onStopWait={this.stopWait} 
                />;
              }} />
              <Route path="/author/:id" render={(props) => {
                return <Author 
                  waiting={this.state.waiting}
                  onNotify={this.notify}
                  onWait={this.wait}
                  onStopWait={this.stopWait}
                  {...props}
                  author={{
                    id: 1, 
                    name: 'Miguel Diganchi', 
                    email: 'migueldiganchi@gmail.com', 
                    birth_date: 'mayo 8, 1982'}} />
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
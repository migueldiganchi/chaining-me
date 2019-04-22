import React, { Component } from 'react';
import './compiled/App.css';

import Header from './components/Header'
import Board from './components/Board'
import Searcher from './components/Searcher';
import BoardPanel from './components/BoardPanel'
import AuthorManager from './components/Authors/AuthorManager';
import PublicationList from './components/Publications/PublicationList'

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    /*this.callApi()
      .then(res => this.setState(res))
      .catch(console.error);*/
  }

  /*callApi = async () => {
    const resp = await fetch('/api');

    window._resp = resp;

    let text = await resp.text();

    let data = null;
    try {
      data = JSON.parse(text); // cannot call both .json and .text - await resp.json();
    } catch (e) {
      console.err(`Invalid json\n${e}`);
    }

    if (resp.status !== 200) {
      throw Error(data ? data.message : 'No data');
    }

    return data;
  };*/

  state = {
    isAuthorManagerVisible: false,
    publications: [{
      id: 1,
      title: "Story nº 1",
      body: "Publication longer content and description",
      date_time: "May 8, 1982"
    }, {
      id: 2,
      title: "Story nº 2",
      body: "Publication longer content and description",
      date_time: "May 30, 1982"
    }, {
      id: 3,
      title: "Story nº 3",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 4,
      title: "Story nº 4",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 5,
      title: "Story nº 5",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 6,
      title: "Story nº 6",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 7,
      title: "Story nº 7",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 8,
      title: "Story nº 8",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }, {
      id: 9,
      title: "Story nº 9",
      body: "Publication longer content and description",
      date_time: "May 21, 1982"
    }]
  };

  goSearch = (e, term) => {
    e.preventDefault();
    console.log('doing search! :D', e);
  }

  goFirstPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications next page');
  }

  goPreviousPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications previous page');
  }

  goNextPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications next page');
  }

  goLastPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications last page', e);
  }

  toggleManager = () => {
    this.setState({
      isAuthorManagerVisible: !this.state.isAuthorManagerVisible
    });
  }

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
          />
        <Board>
          <Searcher 
            onSearch={this.goSearch} 
            />
          <BoardPanel
            title="Publications"
            total={this.state.publications.length}>
            <PublicationList
              publications={this.state.publications}
              onFirst={this.goFirstPage}
              onPrevious={this.goPreviousPage}
              onNext={this.goNextPage}
              onLast={this.goLastPage}
            />
          </BoardPanel>
        </Board>
      </div>
    );
  }
}

export default App;
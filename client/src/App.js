import React, { Component } from 'react';
import './compiled/App.css';

import Header from './components/Header'
import Board from './components/Board'
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

  onFirstPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications next page');
  }

  onPreviousPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications previous page');
  }

  onNextPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications next page');
  }

  onLastPage = (e) => {
    e.preventDefault();
    console.log('@todo: publications last page');
  }

  render() {
    return (
      <div className="App">
        <Header
          title="Welcome to Chaining-me.Text"
          introduction="The new way of doing art, with posts" />
        <AuthorManager />
        <Board>
          <BoardPanel
            title="Publications"
            total={this.state.publications.length}>
            <PublicationList
              publications={this.state.publications}
              onFirst={this.onFirstPage}
              onPrevious={this.onPreviousPage}
              onNext={this.onNextPage}
              onLast={this.onLastPage}
            />
          </BoardPanel>
        </Board>
      </div>
    );
  }
}

export default App;
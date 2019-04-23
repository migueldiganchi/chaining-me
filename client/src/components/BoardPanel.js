import React from 'react';

const BoardPanel = (props) => {
  return(
    <div className="App-board-panel">
      <p className="keypad board-panel-keypad">
        <div className="text">
          <span>{props.title}</span>
          <small>{props.total} results</small>
        </div>
        <a href="#" 
          className="do do-success"
          onClick={props.onCreatePublication}>
          <i className="fas fa-plus" />
          Publication
        </a>
      </p>
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  );
};

export default BoardPanel;
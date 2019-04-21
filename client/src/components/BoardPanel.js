import React from 'react';

const BoardPanel = (props) => {
  return(
    <div className="App-board-panel">
      <p className="panel-title">
        <span>{props.title}</span>
        <small>{props.total} results</small>
      </p>
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  );
};

export default BoardPanel;
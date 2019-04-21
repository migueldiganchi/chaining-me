import React from 'react';

const Board = (props) => {
  return (
    <div className="App-board">
        {props.children}
    </div>
  );
};

export default Board;
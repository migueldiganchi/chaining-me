import React from 'react';

function Header (props) {
  return (
    <header className="App-header">
      <h1 className="App-title">{props.title}</h1>
      <p>
        {props.children}
      </p>
    </header>
  );
};

export default Header;
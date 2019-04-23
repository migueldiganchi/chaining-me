import React from 'react';

function AuthorRemover (props) {
  return (
    <div className="confirmation">
      <div>{props.author.name}</div>
      <div>{props.author.email}</div>
      <div>{props.author.birth_date}</div>

      <div className="keypad">
        <a className="do"
          onClick={props.onCancelRemoving}>
          <i className="fas fa-ban" />
          Cancel
        </a>
        <a className="do do-warning"
          onClick={props.onConfirmRemoving}>
          <i className="fas fa-eraser" />
          Remove
        </a>
      </div>
    </div>
  );
}

export default AuthorRemover;
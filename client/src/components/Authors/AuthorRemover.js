import React from 'react';

function AuthorRemover (props) {
  return (
    <div className="confirmation">
      <div><b>{props.author.name}</b></div>
      <div>
        <small>{props.author.email}</small>
      </div>
      <div>
        <small>{props.author.birth_date}</small>
      </div>

      <div className="keypad">
        <a className="do"
          disabled={props.waiting}
          onClick={props.onCancelRemoving}>
          <i className="fas fa-ban" />
          Cancel
        </a>
        <a className="do do-warning"
          disabled={props.waiting}
          onClick={props.onConfirmRemoving}>
          <i className="fas fa-eraser" />
          Remove
        </a>
      </div>
    </div>
  );
}

export default AuthorRemover;
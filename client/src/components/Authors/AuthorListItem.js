import React from 'react';

const AuthorListItem = (props) => {
  return (
    <div className="list-item"
      onClick={() => props.onAuthorOpen(props.author)}>
      <h4>{props.author.name}</h4>
      <p>
        <small>{props.author.birth_date}</small>
      </p>

      <div className="keypad">
        <a href="#" 
          className="do do-circular do-danger"
          onClick={props.onRemove}>
          <i className="fas fa-eraser" />
        </a>        
        <a href="#" 
          className="do do-circular do-primary"
          onClick={props.onEdit}>
          <i className="fas fa-pencil-alt" />
        </a>
      </div>
    </div>
  );
};

export default AuthorListItem;
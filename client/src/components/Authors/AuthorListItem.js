import React from 'react';

const AuthorListItem = (props) => {
  return (
    <div className="list-item"
      onClick={props.onAuthorOpen}>
      <h4>{props.author.name}</h4>
      <p>
        <span>{props.author.email}</span>
        <small>{props.author.birth_date}</small>
      </p>
    </div>
  );
};

export default AuthorListItem;
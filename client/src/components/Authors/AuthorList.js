import React from 'react';

import AuthorListItem from './AuthorListItem';

import './../../compiled/components/Authors/Authors.css';

const AuthorList = (props) => {
  return (
    <div className="list-container">
      <div className="author-list">
        {props.authors.map((author) => {
          return (<AuthorListItem 
            key={author.id} 
            author={author}
            onAuthorOpen={props.onAuthorOpen} />);
        })}
      </div>
    </div>
  );
};

export default AuthorList;
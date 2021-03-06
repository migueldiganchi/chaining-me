import React from 'react';

import AuthorListItem from './AuthorListItem';
import Paginator from './../Paginator';

import './../../compiled/components/Authors/Authors.css';

function AuthorList (props) {
  return (
    <div className="list-container">
      <div className="author-list">
        {props.authors.map((author) => {
          return (
            <AuthorListItem 
              key={author.id}
              author={author}
              onAuthorOpen={props.onAuthorOpen}
              onEdit={props.onEdit} 
              onStartRemoving={props.onStartRemoving}
              />
          );
        })}
      </div>
      <Paginator 
        onFirst={props.onFirst}
        onPrevious={props.onPrevious}
        onNext={props.onNext}
        onLast={props.onLast} />
    </div>
  );
};

export default AuthorList;
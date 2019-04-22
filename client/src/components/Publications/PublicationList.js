import React from 'react';

import PublicationListItem from './PublicationListItem';
import Paginator from './../Paginator';

import '../../compiled/components/Publications/Publications.css';

const PublicationList = (props) => {
  return (
    <div className="list-container">
      <div className="publication-list">
        {props.publications.map((publication) => {
          return <PublicationListItem key={publication.id} publication={publication} />
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

export default PublicationList;
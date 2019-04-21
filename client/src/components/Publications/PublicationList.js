import React from 'react';

import PublicationListItem from './PublicationListItem';

import '../../compiled/components/Publications/Publications.css';

const PublicationList = (props) => {
  return (
    <div className="list-container">
      <div className="publication-list">
        {props.publications.map((publication) => {
          return <PublicationListItem key={publication.id} publication={publication} />
        })}
      </div>
      <div className="actions">
        <a href="#"
          className="do">Load more publications</a>
      </div>
    </div>
  );
};

export default PublicationList;
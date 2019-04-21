import React from 'react';

const PublicationListItem = (props) => {
  return (
    <div className="list-item">
      <h3>{props.publication.title}</h3>
      <p>
        <span>{props.publication.body}</span>
      </p>
      <small>{props.publication.date_time}</small>
    </div>
  );
}

export default PublicationListItem;
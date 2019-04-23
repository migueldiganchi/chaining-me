import React from 'react';

import PublicationListItem from './PublicationListItem';
import PublicationForm from './PublicationForm';
import Paginator from './../Paginator';

import '../../compiled/components/Publications/Publications.css';

const PublicationList = (props) => {

  let newForm = null;

  if (props.newPublication) {
    newForm = <PublicationForm 
      publication={props.newPublication}
      onCancel={props.onCancel}
      onSave={props.onSave}
      />
  }

  return (
    <div className="list-container">
      {newForm}
      <div className="publication-list">
        {props.publications.map((publication) => {
          return props.publication && props.publication.id === publication.id ? 
            <PublicationForm 
              key={publication.id}
              publication={publication}
              onCancel={props.onCancel}
              onSave={props.onSave}
              /> : 
            <PublicationListItem 
              key={publication.id}
              publication={publication}
              onEdit={props.onEdit} />
        })}
      </div>
      <Paginator 
        onFirst={props.onFirst}
        onPrevious={props.onPrevious}
        onNext={props.onNext}
        onLast={props.onLast} 
        />
    </div>
  );
};

export default PublicationList;
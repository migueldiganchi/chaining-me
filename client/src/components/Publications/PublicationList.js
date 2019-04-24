import React from 'react';

import PublicationListItem from './PublicationListItem';
import PublicationForm from './PublicationForm';
import Paginator from './../Paginator';

import '../../compiled/components/Publications/Publications.css';

const PublicationList = (props) => {

  const isEditing = (publication) => {
    return props.editingPublication && 
      props.editingPublication.id === publication.id;
  };

  const isRemoving = (publication) => {
    return props.removingPublication && 
      props.removingPublication.id === publication.id
  };

  const isDisabled = (publication) => {
    return props.disableItems || 
     (props.editingPublication && props.editingPublication.id != publication.id) || 
     (props.removingPublication && props.removingPublication.id != publication.id)
  };

  let newForm = null;
  let paginator = null;

  if (props.newPublication) {
    newForm = <PublicationForm 
      publication={props.newPublication}
      onCancel={props.onCancel}
      onSave={props.onSave}
      />
  }

  if (!props.newPublication && !props.editingPublication) {
    paginator = <Paginator 
      onFirst={props.onFirst}
      onPrevious={props.onPrevious}
      onNext={props.onNext}
      onLast={props.onLast} 
      />
  }

  return (
    <div className="list-container">
      {newForm}
      <div className="publication-list">
        {props.publications.map((publication) => {
          return isEditing(publication) ? 
            <PublicationForm 
              key={publication.id}
              publication={props.editingPublication}
              onCancel={props.onCancel}
              onSave={props.onSave}
              /> : 
            <PublicationListItem 
              key={publication.id}
              publication={publication}
              isRemoving={isRemoving(publication)}
              isDisabled={isDisabled(publication)}
              onEdit={props.onEdit}
              onStartRemoving={props.onStartRemoving}
              onConfirmRemoving={props.onConfirmRemoving}
              onCancelRemoving={props.onCancelRemoving}
              onOpen={props.onOpen} />
        })}
      </div>
      {paginator}
    </div>
  );
};

export default PublicationList;
import React from 'react';

const PublicationListItem = (props) => {

  const removeHandler = (e) => {
    console.log('remove element');
    e.stopPropagation();
  }
  
  const editHander = (e) => {
    e.preventDefault();
    props.onEdit(props.publication)
  }

  return (
    <div className="list-item"
      onClick={() => props.onPublicationOpen(props.publication)}>
      <h3>{props.publication.title}</h3>
      <p>
        <span>{props.publication.body}</span>
      </p>
      <small>{props.publication.date_time}</small>
      
      <div className="keypad">
        <a href="#"
          className="do do-circular do-danger"
          onClick={removeHandler}>
          <i className="fas fa-eraser" />
        </a>        
        <a href="#"
          className="do do-circular do-primary"
          onClick={editHander}>
          <i className="fas fa-pencil-alt" />
        </a>
      </div>
    </div>
  );
}

export default PublicationListItem;
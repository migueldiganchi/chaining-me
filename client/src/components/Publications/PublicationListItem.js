import React from 'react';

function PublicationListItem (props) {

  const startRemovingHandler = (e) => {
    props.onStartRemoving(props.publication)
    e.stopPropagation();
  };

  const confirmRemoving = (e) => {
    props.onConfirmRemoving(props.publication);
    e.stopPropagation();
  }

  const cancelRemoving = (e) => {
    props.onCancelRemoving(props.publication);
    e.stopPropagation();
  }
  
  const editHander = (e) => {
    props.onEdit(props.publication)
    e.stopPropagation();
  };
  
  let className = 'list-item'
  let confirmation = null;
  let keypad = null;
  
  if (props.isRemoving) {
    className = 'list-item removing';
    confirmation = <div className="keypad confirmation fixed">
      <h4>Are you sure?</h4>
    </div>;
    keypad = <div className="keypad fixed">
      <button type="button"
        className="do"
        onClick={cancelRemoving}>
        <i className="fas fa-ban" />
        Cancel
      </button>
      <a href="#"
        className="do do-warning"
        onClick={confirmRemoving}>
        <i className="fas fa-eraser" />
        Confirm removing
      </a>
    </div>;
  } else {
    keypad = <div className="keypad">
      <a href="#"
        className="do do-circular do-danger"
        onClick={startRemovingHandler}>
        <i className="fas fa-eraser" />
      </a>        
      <a href="#"
        className="do do-circular do-primary"
        onClick={editHander}>
        <i className="fas fa-pencil-alt" />
      </a>
    </div>
  }

  return (
    <div className={className}
      onClick={() => props.onOpen(props.publication)}>
      {confirmation}

      <h3>{props.publication.title}</h3>
      <p>
        <span>{props.publication.body}</span>
      </p>
      <small>{props.publication.date_time}</small>
      
      {keypad}
    </div>
  );
}

export default PublicationListItem;
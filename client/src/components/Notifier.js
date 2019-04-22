import React from 'react';

const Notifier = (props) => {
  
  let message = props.notification ? props.notification.message : null;
  let type = props.notification ? props.notification.type : "";

  let notifierClass = props.notification ? 
    'App-notifier active ' + type : 
    'App-notifier';

  let notificationMessage = message ? 
    <div className="text">
      {message}
    </div> : null;

  return(
    <div className={notifierClass}>
      <div className="keypad">
        {notificationMessage}
        <button type="button"
          className="do do-primary do-circular">
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="logo">
      </div>
    </div>
  );
}

export default Notifier;
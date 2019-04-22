import React from 'react';

import botTalking from './../assets/media/bot-talking.gif';

const Notifier = (props) => {
  let message = props.notification ? props.notification.message : null;
  let type = props.notification ? props.notification.type : "";
  let notifierClass = message ? 
    'App-notifier active ' + type : 
    'App-notifier';
  let notificationMessage = message ? 
    <div className="keypad">
      <div className="text">
        {message}
      </div> 
    </div> : null;

  return(
    <div className={notifierClass}>
      {notificationMessage}
      <div className="bot">
        <img src={botTalking} alt={message} />
      </div>
    </div>
  );
}

export default Notifier;
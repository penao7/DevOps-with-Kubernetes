import React, { useState, useEffect } from 'react';
import './styles.scss';

const MessageHandler = ({ message, setMessage }) => {

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (message.message) {
      clearTimeout(timer);
      setTimer(setTimeout(() => { setMessage({ message: '', error: false }) }, 10000));
    }
  }, [message]); // eslint-disable-line

  return (
    <div>
      {message.error ?
        <div>
          <p className="errorStyle">{message.message}</p>
        </div>
        :
        <div>
          <p className="notificationStyle">{message.message}</p>
        </div>
      }
    </div>
  );
}

export default MessageHandler;
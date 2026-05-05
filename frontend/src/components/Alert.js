import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  React.useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;

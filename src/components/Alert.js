import React from 'react';

function Alert(props) {
  if (!props.alert) return null; // Only display if there's an alert

  return (
    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{props.alert.type}</strong>: {props.alert.msg}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
}

export default Alert;

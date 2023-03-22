import React from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button onClick={props.onClose}>X</button>
        {props.children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;

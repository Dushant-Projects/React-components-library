import React from "react";
import "./styles.css";

function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modal">
        {props.children}
        <button 
          className="btn danger"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;

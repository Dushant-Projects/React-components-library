import React from "react";
import "./styles.css";

function Button(props) {
  return (
    <button 
      className={"btn " + props.type}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;

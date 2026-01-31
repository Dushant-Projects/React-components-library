import React from "react";
import "./styles.css";
<Button 
  text="🎤 Explain Project" 
  type="primary" 
  onClick={speakAboutProject} 
/>

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

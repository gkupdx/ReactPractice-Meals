// Input (UI) component
import React from "react";
import classes from "./Input.module.css";

// need to use forwardRef() instead of just useRef()
// because this is a CUSTOM element, not a standard HTML element
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;

import React from "react";

const FormGroup = React.forwardRef((props, ref) => {
  return (
    <div className={props.className}>
      <div>
        <label htmlFor={props.for}>{props.label}</label>
      </div>
      <div>
        <input
          id={props.for}
          ref={ref}
          type={props.type ? props.type : "text"}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          disabled={props.disabled}
        />
      </div>
      <p>{props.errorText}</p>
    </div>
  );
});

export default FormGroup;

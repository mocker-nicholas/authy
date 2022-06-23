import React from "react";

const FormGroup = React.forwardRef((props, ref) => {
  return (
    <div className={props.className}>
      <div>
        <label htmlFor={props.for}>{props.label}</label>
      </div>
      <div className="w100">
        <input
          id={props.for}
          ref={ref}
          type={props.type ? props.type : "text"}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          disabled={props.disabled}
          data-cy={props.cy}
        />
      </div>
      <p>{props.errorText}</p>
    </div>
  );
});

export default FormGroup;

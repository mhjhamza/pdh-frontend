import React from "react";

import "./styles.css";

const Button = ({ className, value, onclick }) => {
  return (
    <div className="button-wrapper">
      <input
        type="button"
        value={value}
        onClick={onclick}
        className={`button ${className}`}
      />
    </div>
  );
};

export default Button;

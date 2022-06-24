import React from "react";
import "./styles.css";

const Input = ({ placeholder, className, name, value }) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className={`input ${className}`}
      />
    </div>
  );
};

export default Input;

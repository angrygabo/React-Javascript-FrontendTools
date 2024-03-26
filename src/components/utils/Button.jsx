import React from "react";
import PropTypes from 'prop-types';

function Button({ onClick, text, type }) {
  return (
    <button className="btn" onClick={onClick} type={type ? "submit" : "submit"}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string
};

export default Button;

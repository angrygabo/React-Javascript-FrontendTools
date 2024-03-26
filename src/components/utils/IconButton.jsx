import React from "react";
import PropTypes from 'prop-types';

function IconButton({ onClick, icon, text }) {
  return (
    <button className="btn-icon btn" onClick={onClick}>
      {icon} {text && <span>{text}</span>}
    </button>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.element,
  text: PropTypes.string,
};

export default IconButton;

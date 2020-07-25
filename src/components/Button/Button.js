import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, buttonType, onClickFn }) => {
  return buttonType === 'button' ? (
    <button type="button" onClick={onClickFn}>
      {children}
    </button>
  ) : (
    <button type="submit">{children}</button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.string,
  onClickFn: PropTypes.func,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  buttonType: 'button',
};

export default Button;

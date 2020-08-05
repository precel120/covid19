import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ children, buttonType, onClick }) => {
  return buttonType === 'button' ? (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
    </button>
  ) : (
    <button className={styles.button} type="submit">
      {children}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  buttonType: 'button',
};

export default Button;

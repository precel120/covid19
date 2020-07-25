import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Modal = ({ closeModalFn }) => (
  <div className="modal-wrapper">
    <h2>działam</h2>
    <Button buttonType="button" onClickFn={closeModalFn}>
      X
    </Button>
  </div>
);

Modal.propTypes = {
  closeModalFn: PropTypes.func.isRequired,
};

export default Modal;

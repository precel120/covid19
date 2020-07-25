import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Chart from '../Chart/Chart';

const Modal = ({ closeModalFn, dataset }) => (
  <div className="modal-wrapper">
    <Button buttonType="button" onClickFn={closeModalFn}>
      X
    </Button>
    {console.log(dataset)}
    <Chart dataset={dataset} />
  </div>
);

Modal.propTypes = {
  closeModalFn: PropTypes.func.isRequired,
  dataset: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Modal;

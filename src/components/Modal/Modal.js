import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Chart from '../Chart/Chart';
import AppContext from '../../context';

const Modal = ({ dataset }) => (
  <AppContext.Consumer>
    {({ closeModal }) => (
      <div className="modal-wrapper">
        <Button onClickFn={closeModal}>X</Button>
        <Chart dataset={dataset} />
      </div>
    )}
  </AppContext.Consumer>
);

Modal.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Modal;

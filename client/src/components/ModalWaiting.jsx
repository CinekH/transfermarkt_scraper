import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader';

const ModalWaiting = ({text}) => {
  return (
    <div className="modal">
        <ClockLoader color="#c133cd" size="200px"/>
        {text}
    </div>
  )
}

export default ModalWaiting
import React, { useState } from 'react';
import Modal from './MyModal';
import { ICellRenderer } from 'ag-grid-community';

function NameCellRenderer(props) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const { value } = props;


  return (
    <>
   <div>
        <button className="modal-button" onClick={handleOpenModal}>View Details</button>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <p>POOL: {props.node.data.POOL}</p>
          <p>MITARBEITER: {props.node.data.MITARBEITER}</p>
          {/* other modal content */}
        </Modal>
      )}
    </>
  );
}

export default NameCellRenderer;

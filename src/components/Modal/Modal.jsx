import React from 'react';
import Modal from 'react-modal';

function ImageModal({ isModalOpen, closeModal, selectedImage }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
    >
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </Modal>
  );
}

export default ImageModal;

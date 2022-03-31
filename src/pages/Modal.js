import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
function ModalPage({ handleClick, ModalTitle, ModalHead, ModalContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function submitClose() {
    handleClick();
    setIsModalOpen(false);
  }
  return (
    <>
      <div>
        <Button
          style={{ background: "#15d125" }}
          className='mt-6' onClick={openModal}>
          {ModalTitle}
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>{ModalHead}</ModalHeader>
        <ModalBody>{ModalContent}</ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={closeModal}>
            Cancel
          </Button>
          <Button
            style={{ background: "#15d125" }}
            onClick={submitClose} className='w-full sm:w-auto'>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default ModalPage;

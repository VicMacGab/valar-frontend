import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";

interface ValarModalProps {
  title: string;
  body: any;
  okText: string;
  isOpen: boolean;
  onClose?: () => void;
}

const ValarModal: React.FC<ValarModalProps> = (props) => {
  return (
    <Modal
      onClose={() => props.onClose}
      closeable
      isOpen={props.isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>{props.body}</ModalBody>
      <ModalFooter>
        <ModalButton onClick={props.onClose}>{props.okText}</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ValarModal;

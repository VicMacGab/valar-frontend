import { MutableRefObject, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND } from "baseui/button";

interface ValarModalProps {
  title: string;
  body: any;
  isOpen: boolean;
  okText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ValarModal: React.FC<ValarModalProps> = (props) => {
  return (
    <Modal
      onClose={() => props.onCancel}
      isOpen={props.isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Close: {
          style: ({ $theme }) => ({
            display: "none",
          }),
        },
      }}
    >
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>{props.body}</ModalBody>
      <ModalFooter>
        {props.okText && (
          <ModalButton onClick={props.onConfirm} kind={KIND.secondary}>
            {props.okText}
          </ModalButton>
        )}
        {props.cancelText && (
          <ModalButton onClick={props.onCancel}>{props.cancelText}</ModalButton>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ValarModal;

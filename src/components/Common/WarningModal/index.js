import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  List,
} from "reactstrap";
export default function WarningModal({
  active,
  title,
  message,
  cancel,
  confirm,
}) {
  return (
    <Modal isOpen={active}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <p className="text-danger">{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={confirm} color="primary">
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
}

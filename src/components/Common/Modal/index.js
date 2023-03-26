import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  List,
} from "reactstrap";
export default function CustomModal({ active, title, items, close }) {
  return (
    <Modal isOpen={active}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <List type="unstyled">
          {items?.map((item) => (
            <li>{item}</li>
          ))}
        </List>
      </ModalBody>
      <ModalFooter>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

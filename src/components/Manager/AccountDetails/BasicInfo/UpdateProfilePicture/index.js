import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Col,
} from "reactstrap";
export default function UpdateProfilePicture({
  basicInfo,
  active,
  close,
  updateProfilePicture,
}) {
  const [profilePicture, setProfilePicture] = useState(null);
  const handleInputChange = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };
  };
  return (
    <Modal isOpen={active} size="lg">
      <ModalHeader>Update Profile Picture</ModalHeader>
      <ModalBody>
        <Input type="file" onChange={handleInputChange} />

        {profilePicture && (
          <Row>
            <Col>
              <img
                src={profilePicture}
                className="avatar"
                alt="Profile Picture"
              />
            </Col>
          </Row>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          onClick={() => {
            close();
            updateProfilePicture({ profilePicture });
          }}
        >
          Save
        </Button>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

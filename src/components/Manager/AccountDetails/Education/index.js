import React, { useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { SiGooglescholar } from "react-icons/si";
import UpdateEducation from "./UpdateEducation";
import AddEducation from "./AddEducation";
import CustomModal from "../../../Common/Modal";
import WarningModal from "../../../Common/WarningModal";

export default function Education({
  education = [],
  updateUserEducation,
  addUserEducation,
  deleteUserEducation
}) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);


  const [selectedEducation, setSelectedEducation] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [deleteModalTitle, setDeleteModalTitle] = useState("");
  const [deleteModalMessage, setDeleteModalMessage] = useState("");
  const updateEducation = (index) => {
    setSelectedEducation(index);
    toggleUpdateModal();
  };
  const toggleUpdateModal = () => {
    setIsUpdateModal((state) => !state);
  };
  const toggleAddModal = () => {
    setIsAddModal((state) => !state);
  };
  const toggleModal = () => {
    setIsModal((state) => !state);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModal((state) => !state);
  };
  const handleDeleteEducation = (index) => {
    setSelectedEducation(index);
    setDeleteModalTitle('Remove Education');
    setDeleteModalMessage('Are you sure you want to remove education?');
    toggleDeleteModal();
  };
  const deleteEducation = (index) => {
    toggleDeleteModal();
    deleteUserEducation({id:education[selectedEducation]?._id})
  };
  const maxListLength = 3;
  return (
    <>
      <Row className="mt-3">
        <Col xs="10">
          <h2>Education</h2>
        </Col>
        <Col>
          <Button color="primary" outline onClick={toggleAddModal}>
            Add
          </Button>
        </Col>
        <Col xs="12" className="mt-1">
          <Card className="h-100 shadow-lg border-0">
            <CardBody>
              {education?.length > 0 ? (
                <>
                  {education?.map((education, index) => {
                    if (index < maxListLength) {
                      return (
                        <Row key={index} className="mt-2 align-items-center">
                          <Col xs="12" md="1">
                            <SiGooglescholar size={40} />
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <h5 className="font-weight-bold text-black-50">
                                  {education?.institution}
                                </h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h3 className="font-weight-bolder mb-0">
                                  {education?.program}
                                </h3>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6 className="font-weight-bold text-black-50">
                                  {education?.passingYear}
                                </h6>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Button
                              color="primary"
                              outline
                              onClick={() => updateEducation(index)}
                            >
                              Update
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              color="danger"
                              outline
                              onClick={()=>handleDeleteEducation(index)}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                  {education?.length > maxListLength && (
                    <Row className="justify-content-end">
                      <Col xs="6" md="5">
                        <h4
                          className="text-primary"
                          onClick={() => {
                            setModalTitle("Education");
                            setModalData(
                              education?.map(
                                (edu) =>
                                  `${edu.program} ${edu.institution} ${edu.passingYear}`
                              )
                            );
                            toggleModal();
                          }}
                        >
                          +1 more
                        </h4>
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                <Row className="justify-content-center">
                  <Col xs="4">
                    <strong>No education history found</strong>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <UpdateEducation
        education={education[selectedEducation]}
        active={isUpdateModal}
        close={toggleUpdateModal}
        updateUserEducation={updateUserEducation}
      />
      <AddEducation
        active={isAddModal}
        close={toggleAddModal}
        addUserEducation={addUserEducation}
      />
      <CustomModal
        active={isModal}
        title={modalTitle}
        items={modalData}
        close={toggleModal}
      />
      <WarningModal
        active={isDeleteModal}
        title={deleteModalTitle}
        message={deleteModalMessage}
        cancel={toggleDeleteModal}
        confirm={deleteEducation}
      />
    </>
  );
}

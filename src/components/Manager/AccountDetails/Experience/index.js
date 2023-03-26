import React, { useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { IoBag } from "react-icons/io5";
import moment from "moment";

import UpdateExperience from "./UpdateExperience";
import AddExperience from "./AddExperience";
import CustomModal from "../../../Common/Modal";
import WarningModal from "../../../Common/WarningModal";

export default function Experience({
  experience = [],
  addUserExperience,
  updateUserExperience,
  deleteUserExperience,
}) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [selectedExperience, setSelectedExperience] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [deleteModalTitle, setDeleteModalTitle] = useState("");
  const [deleteModalMessage, setDeleteModalMessage] = useState("");
  const updateExperience = (index) => {
    setSelectedExperience(index);
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
  const handleDeleteExperience = (index) => {
    setSelectedExperience(index);
    setDeleteModalTitle("Remove Experience");
    setDeleteModalMessage("Are you sure you want to remove experience?");
    toggleDeleteModal();
  };
  const deleteExperience = () => {
    toggleDeleteModal();
    deleteUserExperience({ id: experience[selectedExperience]?._id });
  };
  const maxListLength = 3;
  return (
    <>
      <Row className="mt-3">
        <Col xs="10">
          <h2>Experience</h2>
        </Col>
        <Col>
          <Button color="primary" outline onClick={toggleAddModal}>
            Add
          </Button>
        </Col>
        <Col xs="12" className="mt-1">
          <Card className="h-100 shadow-lg border-0">
            <CardBody>
              {experience?.length > 0 ? (
                <>
                  {" "}
                  {experience?.map((experience, index) => {
                    if (index < maxListLength) {
                      return (
                        <Row key={index} className="mt-2 align-items-center">
                          <Col xs="12" md="1">
                            <IoBag size={40} />
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <h5 className="font-weight-bold text-black-50">
                                  {experience?.organization}
                                </h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h3 className="font-weight-bolder mb-0">
                                  {experience?.designation}
                                </h3>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6 className="font-weight-bold text-black-50">
                                  {moment(experience?.fromDate).format(
                                    "YYYY-MM"
                                  )}{" "}
                                  {" to "}
                                  {experience?.isCurrent
                                    ? "Currently working here"
                                    : moment(experience?.toDate).format(
                                        "YYYY-MM"
                                      )}
                                </h6>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Button
                              color="primary"
                              outline
                              onClick={() => updateExperience(index)}
                            >
                              Update
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              color="danger"
                              outline
                              onClick={() => handleDeleteExperience(index)}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                  {experience?.length > maxListLength && (
                    <Row className="justify-content-end">
                      <Col xs="6" md="5">
                        <h4
                          className="text-primary"
                          onClick={() => {
                            setModalTitle("Experience");
                            setModalData(
                              experience?.map(
                                (exp) =>
                                  `${exp.designation} ${
                                    exp.organization
                                  } ${moment(exp?.fromDate).format(
                                    "YYYY-MM"
                                  )} To ${moment(exp?.toDate).format(
                                    "YYYY-MM"
                                  )}`
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
                    <strong>No experience history found</strong>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <UpdateExperience
        experience={experience[selectedExperience]}
        active={isUpdateModal}
        close={toggleUpdateModal}
        updateUserExperience={updateUserExperience}
      />
      <AddExperience
        active={isAddModal}
        close={toggleAddModal}
        addUserExperience={addUserExperience}
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
        confirm={deleteExperience}
      />
    </>
  );
}

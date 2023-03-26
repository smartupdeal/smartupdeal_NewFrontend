import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import CustomModal from "../../../Common/Modal";
import UpdateInterests from "./UpdateInterests";
export default function Interests({
  skills,
  availableSkills,
  updateUserSkills,
  industries,
  availableIndustries,
  updateUserIndustries,
  technologies,
  availableTechnologies,
  updateUserTechnologies,
}) {
  const [isModal, setIsModal] = useState(false);
  const [isInterestsUpdate, setIsInterestsUpdate] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

  const toggleModal = () => {
    setIsModal((state) => !state);
  };
  const toggleInterestsUpdate = () => {
    setIsInterestsUpdate((state) => !state);
  };
  const maxListLength = 3;
  return (
    <>
      <Row className="mt-3">
        <Col xs="10">
          <h2>Interests</h2>
        </Col>
        <Col xs="2">
          <Button
            onClick={() => {
              toggleInterestsUpdate();
            }}
          >
            Update
          </Button>
        </Col>
        <Col xs="12" md="4" className="mt-1">
          <Card className="h-100 shadow-lg border-0">
            <CardBody>
              <CardTitle tag="h3" className="text-primary">
                Skills
              </CardTitle>
              {skills?.length > 0 ? (
                <>
                  {skills?.map((skill, index) => {
                    if (index < maxListLength) {
                      return (
                        <Row key={index}>
                          <Col>
                            <span className="font-weight-normal">
                              {skill?.name}
                            </span>
                          </Col>
                        </Row>
                      );
                    }
                  })}

                  {skills?.length > maxListLength && (
                    <Row className="justify-content-end">
                      <Col xs="6" md="5">
                        <h4
                          className="text-primary"
                          onClick={() => {
                            setModalTitle("Skills");
                            setModalData(skills?.map((skill) => skill?.name));
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
                  <Col xs="12">
                    <strong>No skills found</strong>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="4" className="mt-1">
          <Card className="h-100 shadow-lg border-0">
            <CardBody>
              <CardTitle tag="h3" className="text-primary">
                Industries
              </CardTitle>
              {industries?.length > 0 ? (
                <>
                  {" "}
                  {industries?.map((industry, index) => {
                    if (index < maxListLength) {
                      return (
                        <Row key={index}>
                          <Col>
                            <span className="font-weight-normal">
                              {industry?.name}
                            </span>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                  {industries?.length > maxListLength && (
                    <Row className="justify-content-end">
                      <Col xs="6" md="5">
                        <h4
                          className="text-primary"
                          onClick={() => {
                            setModalTitle("Industries");
                            setModalData(
                              industries?.map((industry) => industry?.name)
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
                  <Col xs="12">
                    <strong>No industries found</strong>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="4" className="mt-1">
          <Card className="h-100 shadow-lg border-0">
            <CardBody>
              <CardTitle tag="h3" className="text-primary">
                Technologies
              </CardTitle>
              {technologies?.length > 0 ? (
                <>
                  {technologies?.map((technology, index) => {
                    if (index < maxListLength) {
                      return (
                        <Row key={index}>
                          <Col>
                            <span className="font-weight-normal">
                              {technology?.name}
                            </span>
                          </Col>
                        </Row>
                      );
                    }
                  })}

                  {technologies?.length > maxListLength && (
                    <Row className="justify-content-end">
                      <Col xs="6" md="5">
                        <h4
                          className="text-primary"
                          onClick={() => {
                            setModalTitle("Technologies");
                            setModalData(
                              technologies?.map(
                                (technology) => technology?.name
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
                  <Col xs="12">
                    <strong>No technologies found</strong>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CustomModal
        active={isModal}
        title={modalTitle}
        items={modalData}
        close={toggleModal}
      />
      <UpdateInterests
        active={isInterestsUpdate}
        close={toggleInterestsUpdate}
        skills={availableSkills}
        currentSkills={skills}
        updateUserSkills={updateUserSkills}
        industries={availableIndustries}
        currentIndustries={industries}
        updateUserIndustries={updateUserIndustries}
        technologies={availableTechnologies}
        currentTechnologies={technologies}
        updateUserTechnologies={updateUserTechnologies}
      />
    </>
  );
}

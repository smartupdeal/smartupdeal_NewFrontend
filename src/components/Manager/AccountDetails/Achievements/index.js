import React, { useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { GiAchievement } from "react-icons/gi";
import UpdateAchievements from "./UpdateAchievements";
import CustomModal from "../../../Common/Modal";
export default function Achievements({ achievements,updateUserAchievements }) {
  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [isAchievementsUpdate, setIsAchievementsUpdate] = useState(false);
  const toggleAchievementsUpdate = () => {
    setIsAchievementsUpdate((state) => !state);
  };
  const toggleModal = () => {
    setIsModal((state) => !state);
  };
  const maxListLength = 3;
  return (
    <>
      <Row className="mt-3">
        <Col xs="10">
          <h2>Achievements</h2>
        </Col>
        <Col xs="2">
          <Button
            onClick={() => {
              toggleAchievementsUpdate();
            }}
          >
            Update
          </Button>
        </Col>
        <Col xs="12" className="mt-1">
          <Card className="h-100 shadow-lg border-0">
            <CardBody>
              {achievements?.length>0 ? (<Row>
                <Col xs="12" md="1">
                  <GiAchievement size={60} />
                </Col>
                <Col>
                  {achievements?.map((achievement, index) => {
                    if (index < maxListLength) {
                      return (
                        <Row key={index}>
                          <Col>
                            <span className="font-weight-normal">
                              {achievement}
                            </span>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                  {achievements?.length > maxListLength && (
                    <Row className="justify-content-end">
                      <Col xs="6" md="5">
                        <h4 className="text-primary"  onClick={() => {
                        setModalTitle("Achievements");
                        setModalData(achievements);
                        toggleModal();
                      }}>+1 more</h4>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>):(<Row className="justify-content-center"><Col xs="4"><strong>No achievements found</strong></Col></Row>)}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <UpdateAchievements
        active={isAchievementsUpdate}
        close={toggleAchievementsUpdate}
        currentAchievements={achievements}
        updateUserAchievements={updateUserAchievements}
      />
       <CustomModal
        active={isModal}
        title={modalTitle}
        items={modalData}
        close={toggleModal}
      />
    </>
  );
}

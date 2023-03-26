import React, { useState, useRef } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Input,
  InputGroup,
} from "reactstrap";
import { ImCross } from "react-icons/im";

export default function UpdateAchievements({
  currentAchievements,
  active,
  close,
  updateUserAchievements,
}) {
  const [achievement, setAchievement] = useState("");
  const [newAchievements, setNewAchievements] = useState(currentAchievements);

  const addAchievements = () => {
    setNewAchievements((achievements) => [...achievements, achievement.trim()]);
    setAchievement("");
  };
  const removeItem = (index) => {
    setNewAchievements((achievements) => {
      return [
        ...achievements.slice(0, index),
        ...achievements.slice(index + 1, achievements.length),
      ];
    });
  };
  return (
    <Modal isOpen={active} size="lg">
      <ModalHeader>Update</ModalHeader>
      <ModalBody style={{ height: "300px" }}>
        <div className="row mb-2">
          {newAchievements?.map((achievement, index) => (
            <div className="mb-1 mr-1" key={index}>
              <Badge
                color="primary"
                pill
                style={{ fontSize: "1rem", textAlign: "center" }}
              >
                {achievement}
                <span
                  className="badge-remove-icon"
                  onClick={() => removeItem(index)}
                >
                  <ImCross />
                </span>
              </Badge>
            </div>
          ))}
        </div>
        <InputGroup>
          <Input
            id="public-methods-example"
            placeholder="Add Achievement"
            onChange={(e) => {
              setAchievement(e.target.value);
            }}
            value={achievement}
          />
          <Button type="button" onClick={addAchievements}>
            Add
          </Button>
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          form="UpdateExperience"
          type="submit"
          onClick={() => {
            updateUserAchievements(newAchievements);
            close();
          }}
        >
          Save
        </Button>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
